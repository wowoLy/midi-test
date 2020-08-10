export default function (arr){
  let hash=[];
  for (let i = 0; i < arr.length; i++) {
    if(arr.indexOf(arr[i]) === i){
      hash.push(arr[i]);
    }
  }
  return hash;
}
