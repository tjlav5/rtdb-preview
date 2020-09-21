import { object } from "rxfire/database";
import { Observable, pipe, UnaryFunction } from "rxjs";
import { map, switchMap } from "rxjs/operators";

interface PrimitiveViewModel {
  ref: firebase.database.Reference;
  value: string;
  children: undefined;
}

interface IterableViewModel {
  ref: firebase.database.Reference;
  value: undefined;
  children: [firebase.database.Reference, number][];
}

export type ViewModel = PrimitiveViewModel | IterableViewModel;

function countDescendants(item: any) {
  if (Array.isArray(item)) {
    return item.length + item.reduce((acc, i) => acc += countDescendants(i), 0);
  }
  if (typeof item === 'object') {
    // return Object.keys()
    const values = Object.values<any>(item);
    return values.length + values.reduce((acc, i) => acc += countDescendants(i), 0);
  }
  return 0;
}

function toViewModel(
  snapshot: firebase.database.DataSnapshot
): ViewModel {
  if (snapshot.hasChildren()) {
    const children = [];
    const val = snapshot.val();
    snapshot.forEach(c => {
      debugger;
      const urlParts = c.key.split('/');
      children.push([c.ref, countDescendants(val[urlParts[urlParts.length - 1]])]);
    });
    // let descendantCount = countDescendants(snapshot.val());
    return { children, ref: snapshot.ref, value: undefined };
  }

  return { ref: snapshot.ref, value: snapshot.val(), children: undefined };
}

export function switchMapToViewModel(): UnaryFunction<
  Observable<firebase.database.Reference>,
  Observable<ViewModel>
> {
  return pipe(
    switchMap(ref => object(ref)),
    map(queryChange => toViewModel(queryChange.snapshot))
  );
}
