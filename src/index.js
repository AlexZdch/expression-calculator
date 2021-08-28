function check(str, arr) {
    var hesh = {};
    var temp = {};
    var strArr = [];
  
    for ( let i = 0; i < arr.length; i ++ ){
  
     for ( let j = 0; j < 2; j ++ ){
  
          var temp = {};
  
          temp.index = i;
      if( !(arr[i][j] in hesh) ) {
          if ( j === 0 ) {
             temp.status = 'open';     
          } else if ( j === 1 ){
             temp.status = 'close';               
          }     
          hesh[arr[i][j]] = temp; 
       } else if( arr[i][j] in hesh ) {
          
          hesh[arr[i][j]].status = 'bilateral';  
        } 
      }    
    }
  
   strArr = str.split('');
     
   function funBilatery(ar) {
  
      let ind;
      let count = 0;
      let j = 0;
      let i = 0;
      do
      {
  
             ind = hesh[ar[i]].index;
             j = i;
             count = 0;
  
             while ( j < ar.length && hesh[ar[j]].index === ind ){
  
                 j ++ ;
                 count ++ ;
  
             }
           if( !(count%2) ) 
             {
                
                 ar.splice( i,count );
                 i = j - count - 1;
                 if ( i < 0 ) { i = 0;} 
                 continue;              
  
            } else if ( count%2 && count > 1 )
               {
                                               
                 ar.splice( i,count - 1 );
                 i = j - count;   
                 continue;          
              }         
          i ++;
      } while ( i < ar.length )
  
          if ( ar.length )  {  return false;  }
            else {  return true; }
   }
  
  
   for ( let i = 0; i < strArr.length; i ++ ){
  
    if ( hesh[strArr[i]].status === 'close' ) {
      
        if ( (i !== 0) && (hesh[strArr[i-1]].status === 'open') && (hesh[strArr[i]].index === hesh[strArr[i-1]].index) ) {
         strArr.splice( i-1,2 );
           i = i - 2;
  
       } else if ( (i !== 0) && (hesh[strArr[i-1]].status === 'bilateral')) {
  
            let j = i - 1;
            let count  = 0;
  
            while( hesh[strArr[j]].status === 'bilateral'){
  
               count ++;
               j --;
            }
        
           if ( !(count %2) && (j !== 0) && (hesh[strArr[j]].status === 'open') && (hesh[strArr[j]].index === hesh[strArr[i]].index) ) {
  
              strArr.splice( j, ( i - j + 1 ) );
              i = j - 1;           
  
           }   
          
          else{ return false; }
         }  
        else { return false; }
    } 
  
  }
  
  
    if( strArr.length && strArr.length%2  ) 
    {
      return false;
  
   } else if ( strArr.length && !(strArr.length%2) ) 
     {  
  
          for(let i = 0 ; i < strArr.length; i ++){
            if (hesh[strArr[i]].status != 'bilateral') 
             {
                  return false;
              }
          }
        return funBilatery(strArr);
     }
  if ( !strArr.length ) { return true; }
  }
  
function expressionCalculator(str) {

    function funOpt( arr ) {      
 
      var symb ={ '*':true, '+':true, '/': true, '-': true, '(': true, ')': true};
      var arrTmp = [ ];
      var i = 0; 
      var strTmp = '';
      var k;
 
      do{
 
         if ( arr[i] === '-' && ( !(arr[i-1] >= '0' && arr[i-1] <= '9') ) && (typeof(arr[i-1])!='number') && arr[i-1]!==')'  && (arr[i+1] >= '0' && arr[i+1] <= '9') ) {
              strTmp = '';
              k = i;
  
            do{
                strTmp = strTmp + arr[i];
                i++;      
              }while( !(arr[i] in symb) )
 
             arr.splice(k,i-k,Number(strTmp));  
             i = k;                                 
         }   
 
    else
      if ( arr[i] >='0' && arr[i] <= '9') {
         strTmp ='';
         k = i;
         do{
             strTmp = strTmp + arr[i];
             i++;      
          }while( !(arr[i] in symb) && i < arr.length )
 
          arr.splice(k,i-k,Number(strTmp));  
          i = k;                                   
      }
        
    i++; 
             
       }while (i < arr.length);
 
    for( i = 0; i < arr.length; i ++ )
       if ( arr[i - 1] === '(' && arr[i+1] === ')' )  { k = arr[i]; arr.splice(i-1,3,k); }
 
 
 return arr;
 
    }
 
    function simpleCalc( arr ) { 
 
       var i;
       var result;
 
       for( i = 0; i < arr.length; i ++ ) {
          if( arr[i] === '*' ) { arr.splice( i-1, 3, arr[i-1]*arr[i+1] );  i -- ; }
          if( arr[i] === '/' ) { if(arr[i-1] / arr[i+1] === Infinity) {throw new Error('TypeError: Division by zero.');} arr.splice( i-1, 3, arr[i-1]/arr[i+1] );  i -- ;  } 
       }
       for( i = 0; i < arr.length; i ++ ){
          if( arr[i] === '+' ) { arr.splice( i-1, 3, arr[i-1]+arr[i+1] );   i--; }
          if( arr[i] === '-' ) { arr.splice( i-1, 3, arr[i-1]-arr[i+1] );  i--; } 
       }
 
    return arr[0];
 
    }
 
    function bracketDel( arr ) { 
 
       var i = 0;
  
       do {
          var arrTmp = [ ];
          var k = -1;
 
          for ( i = 0; i < arr.length; i ++ )
           if ( arr[i] === '(' )  k = i;  
 
          if ( k != -1 ) {
             i = k + 1;         
          do{
             arrTmp.push(arr[i]);
             i++;
          }while ( arr[i] != ')' ); 
 
          arr.splice(k, i - k + 1 , simpleCalc( arrTmp ) ); 
          }   
 
       else
          return simpleCalc( arr );
       }while (0!=1);
    }
 
     function strBracket(str){
 
       let arrResult = [];
       for(let i = 0; i < str.length; i++){
         if(str[i] === '(' || str[i] === ')') { arrResult.push(str[i]); }    
        }
 
     if(arrResult.length === 0) { return 0; }
         
     if(!check( arrResult.join(''), [['(', ')']] ) ) { throw new Error('ExpressionError: Brackets must be paired'); }
     return  1;
     }
 
 
   str = str.split(' ').join(''); 
   let pairBracket = strBracket(str);
   var array = str.split(''); 
   array = funOpt( array );  
   return Math.round( bracketDel(array) * 10000 ) / 10000 ;
 }

module.exports = {
    expressionCalculator
}