//@ Defining the debounce function
// generic --> FuncType "variable" is a functio nthat takes in a spread array of any type
// debounce --> accepts a function of type FuncType (function that takes arguments and returns nothing)
//          --> accepts a "delay" of type number
// returns --> returns a function that has the exact same arguments of FuncType and returns void

//# This is called a higher order (function that takes in another function or return one) and a CLOSURE --> functions that have a state
//  closures remember a value that persists through executions / calls

//@ Defining the maxWait / throttle functionality
// when the function is called --> check if there
export default function debounce<
   ArgsType extends any[],
   FuncType extends (...args: ArgsType) => void,
>(
   func: FuncType,
   delay: number,
   maxWaitTime: number = 30000,
): (...args: Parameters<FuncType>) => void {
   //the persistent variable / state of the debounce function
   let timeoutID: ReturnType<typeof setTimeout> | undefined;
   let lastSaveTime: number = 0;

   // the function that will actually be called
   return (...args: Parameters<FuncType>) => {
      const now = Date.now();

      // set the beginning of the save timer (if there isn't one already)
      if (!lastSaveTime) {
         lastSaveTime = now;
      }

      //if the debounce function is called with a pre-existing timeout --> kill it --> we set a new one after!
      if (timeoutID) {
         clearTimeout(timeoutID);
      }

      // check if its been 10 / 30 seconds since the "lastSaveTime" --> if yes, call the save function --> reset the saveTime
      if (now - lastSaveTime >= maxWaitTime) {
         func(...args);
         lastSaveTime = now;
      } else {
         timeoutID = setTimeout(() => {
            func(...args);

            lastSaveTime = 0;
         }, delay);
      }
   };
}
