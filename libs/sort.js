/* FUNCION PARA UNIR DOS ARREGLOS ORDENADOS */
/* THIS FUNCTION RECEVIVES TWO ARRAYS TO MERGE AND THE KEY TO CONSIDER */
function merge2Array (A, B, key)
{
  let D = [];
//	console.log(A.length);
  do
  {
//    console.log('Len A: ' + A.length + 'Len B: ' + B.length);
/* console.log('A: '+ JSON.stringify(A));
console.log('B: '+ JSON.stringify(B)); */
console.log('ISBN A: ' + A[0][`${key}`]);
console.log('ISBN B: ' + B[0][`${key}`]);
    if (parseInt(B[0][`${key}`]) <= parseInt(A[0][`${key}`]))
    {
      D.push(B[0]);
      B.shift();
//	console.log('B: ' + B);
    }
    else
    {
      D.push(A[0]);
      A.shift();
//	console.log('A: ' + A.length);
    }
  }
  while ((A.length > 0) && (B.length > 0));

  A.length != 0 ? D.push(...A):"";
  B.length != 0 ? D.push(...B):"";
  return D;
}
/* FUNCION PARA ORDENAR UN ARREGLO EN ORDEN ASCENDENTE */
/* THIS FUNCTION RECEIVES AN ARRAY OF OBJECTS AND THE KEY TO SORT BY */
function mergeSort (array, key)
{
  let n = array.length;
  if (n === 1)
  {
    return array;
  }
  let m = Math.floor(n / 2);
//  console.log('Original:' + array + '\nArreglo B: ' + array.slice(0,m) + '\nArreglo C: ' + array.slice(m,n));
  let B = mergeSort(array.slice(0, m));
  let C = mergeSort(array.slice(m, n));
  let A = merge2Array(B, C, key);
  return A;
}
module.exports = { merge2Array, mergeSort }