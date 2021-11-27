const fs = require("fs");
let dataArr = []
let validPasswords = 0

let findValidPasswordsOld = (arr) => {
    for(i in arr) {
        let lowerBound = arr[i][0][0]
        let upperBound = arr[i][0][1]
        let letter = arr[i][0][2]
        let password = arr[i][0][3].split("")
        let sortedPassword = password.sort((a, b) => {
            if (a < b) {return -1}
            if (b < a) {return 1}
            return 0
        })
        let letterCount = 0
        
        for(let i = 0; i < sortedPassword.length; i++){
            if (sortedPassword[i] === letter){
                letterCount++
            }
        }

        if (letterCount >= lowerBound && letterCount <= upperBound) {
            validPasswords++
        }
    
    }
    
    return validPasswords
    
    
}

let findValidPasswords = (arr) => {
    for(i in arr){
        let firstPosition = arr[i][0][0]
        let secondPosition = arr[i][0][1]
        let letter = arr[i][0][2]
        let password = arr[i][0][3].split("")
        let letterInPosOne = false
        let letterInPosTwo = false

        if(password[firstPosition - 1] === letter) {
            letterInPosOne = true
        }

        if(password[secondPosition - 1] === letter) {
            letterInPosTwo = true
        }

        if(letterInPosOne && !letterInPosTwo){
            validPasswords++
        }
        if(!letterInPosOne && letterInPosTwo){
            validPasswords++
        }
    }

    return validPasswords
}

let createArrMatrix = () => {
    // Pull in data from input.txt
    let input = fs.readFileSync('./input.txt', 'utf8')
    
    // Split data into array on new line
    let data = input.split('\n')
    
    for(i in data) {
        let tempArr = []
        // Split each String on a SPACE 
        tempArr.push(data[i].split(" "))
        
        let numbers = tempArr[0][0].split("-")
        // Split Numbers on "-" and splice them into the tempArr Ex: [1-14] -> [1], [14]
        tempArr[0].splice(0, 1, numbers[0])
        tempArr[0].splice(1, 0, numbers[1])
        // Split letter on ":" and splice into tempArr Ex: [b:] -> [b], ['']
        let letter = tempArr[0][2].split(":")
        tempArr[0].splice(2, 1, letter[0])
        // Data should look like ['1', '14, 'b', 'bbbbbbbbbbbbb']
        //                       [Lower Bound, UpperBound, Letter, Password]
        dataArr.push(tempArr)
    }
    
    return dataArr
}

// console.log(findValidPasswordsOld(createArrMatrix()))

console.log(findValidPasswords(createArrMatrix()))