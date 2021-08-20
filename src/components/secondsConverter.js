// https://www.codegrepper.com/code-examples/javascript/javascript+convert+integer+minutes+to+seconds
// Credit to Glorious Guanaco

export const convertSeconds = sec => {
    let minutes = Math.floor(sec  / 60); // get minutes
    let seconds = sec - (minutes * 60); //  get seconds
    // add 0 if value < 10; Example: 2 => 02
    if (minutes < 10) {minutes = "0"+minutes;}
    if (seconds < 10) {seconds = "0"+seconds;}
    return minutes+':'+seconds; // Return is HH : MM : SS
}