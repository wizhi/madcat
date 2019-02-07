import fs from "fs";
import path from "path";

/**
 * Check if file exists, watching containing directory meanwhile.
 * Resolve if the file exists, or if the file is created before the timeout occurs.
 * 
 * @param {string} fileName 
 * @param {integer} timeout 
 */
export default function waitForDownloadToComplete(fileName, timeout = 15000) {
    return new Promise(function (resolve, reject) {
        // const timer = setTimeout(function () {
        //     watcher.close();
        //     reject(new Error('Timeout!'));
        // }, timeout);

        // Check if file exists
        // fs.access(filePath, fs.constants.R_OK, function (err) {
        //     if (!err) {
        //         clearTimeout(timer);
        //         watcher.close();
        //         resolve();
        //     }
        // });

        const dir = path.dirname(fileName);
        const basename = path.basename(fileName);
        console.log('starting to watch')
        const watcher = fs.watch(dir, function (eventType, filename) {
            console.log(`${new Date().getTime()} : tick`)
            if (eventType === 'rename' && filename === basename) {
                console.log('done?')
                // clearTimeout(timer);
                watcher.close();
                resolve();
            }
        });
    });
}
