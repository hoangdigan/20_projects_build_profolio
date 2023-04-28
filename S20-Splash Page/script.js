const { body } = document
let count =0

const ourMemory = {
    [count]: Array(10000).fill('*')
}

function changebackground(number) {
    count++
    ourMemory[count] =  Array(10000).fill('*')
    // Check if background already showing
    let previousBackground
    if (body.className) {
        previousBackground = body.className
    }
    // Reset CSS
    body.className = ''
    switch (number) {
        case '1':
            body.classList.add('background-1')
            return (previousBackground === 'background-1' ? false : body.classList.add('background-1'))
        case '2':
            body.classList.add('background-2')
            return (previousBackground === 'background-2' ? false : body.classList.add('background-2'))
        case '3':
            body.classList.add('background-3')
            return (previousBackground === 'background-3' ? false : body.classList.add('background-3'))            
        default:
            break;
    }
}

