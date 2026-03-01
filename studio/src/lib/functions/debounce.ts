//@ Defining the debounce function
// generic --> FuncType "variable" is a functio nthat takes in a spread array of any type
// debounce --> accepts a function of type FuncType (function that takes arguments and returns nothing)
//          --> accepts a "delay" of type number
// returns --> returns a function that has the exact same arguments of FuncType and returns void

//# This is called a higher order (function that takes in another function or return one) and a CLOSURE --> functions that have a state
//  closures remember a value that persists through executions / calls
export default function debounce<
   ArgsType extends any[],
   FuncType extends (...args: ArgsType) => void,
>(func: FuncType, delay: number): (...args: Parameters<FuncType>) => void {
   //the persistent variable / state of the debounce function
   let timeoutID: ReturnType<typeof setTimeout> | undefined;

   // the function that will actually be called
   return (...args: Parameters<FuncType>) => {
      //if the debounce function is called with a pre-existing timeout --> kill it --> we set a new one after!
      if (timeoutID) {
         clearTimeout(timeoutID);
      }

      timeoutID = setTimeout(() => {
         func(...args);
      }, delay);
   };
}
