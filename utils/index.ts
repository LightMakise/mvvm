export function isEmptyObject(o: Object) {
  let t
  for (t in o) {
    return !1;
  }
  return !0
}