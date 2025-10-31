import * as fs from 'fs/promises';

export async function waitForFile(
   filePath: string,
   timeout = 7000
): Promise<boolean> {
   const starttime = Date.now();
   console.log(
      `Waiting for video to be ready (downloaded) from Google: ${filePath}`
   );

   //! Loop until we reach our timeout (7 seconds or specified)
   while (Date.now() - starttime < timeout) {
      try {
         // fs.stat throws an error if the file doesn't exist --> else stats = true
         const stats = await fs.stat(filePath);

         // checking if stats has any size --> if size --> exists
         if (stats.size > 0) {
            console.log(`File is ready (size: ${stats.size} bytes).`);
            return true;
         }
      } catch (err: any) {
         // 'ENOENT' is "Error NO ENTry" (file not found).
         // We ignore this error and just try again.
         if (err.code !== 'ENOENT') {
            throw err; // A different, real error occurred
         }
      }
      // wait 200ms before the next check
      await new Promise((resolve) => setTimeout(resolve, 200));
   }

   // if we exit the loop, we timed out
   throw new Error(`File at ${filePath} was not ready after ${timeout}ms.`);
}
