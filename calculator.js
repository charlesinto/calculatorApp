window.onload = function(){  
    _init_();
}


function startApp(){
    var $ = function(selector, container){
        return Array.from((container || document).querySelectorAll(selector));
    }
    var result = 0;
    var currentEntry = '';
    var textcontent = '';
    var textContainer = $('.text-container')[0]
    var resultContainer = $('.result')[0]
    var entries = [];

    function uiCanInteract(){
        $('.numbers').forEach(item => {
            item.addEventListener('click', numberClickHandler, false);
        })
        $('.decimal').forEach(item => {
            item.addEventListener('click', decimalClickHandler, false);
        })
        $('.control').forEach(item => {
            item.addEventListener('click', controlClickHandler, false);
        })
    }
    
    var decimalClickHandler = function(event){
        if( currentEntry !== '' && currentEntry.indexOf('.') === -1){
            currentEntry += '.';
            var lastArrayEntry = entries.join(' ')
            textContainer.innerHTML = lastArrayEntry + ' ' + currentEntry;
        }
        return
    }
    var numberClickHandler = function(event){
        var clickedString = '';
        if(currentEntry.indexOf('.') === -1){
            currentEntry += event.target.textContent;
        }else{
            wholenumber = currentEntry.split('.')[0]
            fraction = currentEntry.split('.')[1]
            fraction += event.target.textContent
            currentEntry = wholenumber + '.' + fraction;
        }
        
        var lastArrayEntry = entries.join(' ')
        var clickedNumber = parseFloat(currentEntry);
        //entries.push(clickedNumber);
        textContainer.innerHTML = lastArrayEntry + ' ' + clickedNumber;
        //carryOutOperation()
    }
    
    var controlClickHandler = function(event){
        switch(event.target.textContent){
            case 'DEL':
                resetEntries()
                break;
            case '+':
                performOperation('+')
                break;
            case '-':
                performOperation('-')
                break;
            case '/':
                performOperation('/')
                break;
             case 'X':
                performOperation('X')
            case '=':
                calculateResult()
                break;
        }
    }
    var resetEntries = function(){
        entries = [];
        textContainer.innerHTML = '';
        resultContainer.innerHTML = ''
        currentEntry = '';
        result = 0;
    }
    var calculateResult = function(){
        if(currentEntry !== ''){
            if(currentEntry.indexOf('.') !== -1){
                if(currentEntry.split('.').length !== 2){
                    currentEntry = currentEntry.split('.') + '.' + 0
                }
            }
            entries.push(parseFloat(currentEntry));
            carryOutOperation();
            currentEntry = '';
        }
    }
    var performOperation = function(operation){
        var controls = ['DEL', '-', '+', 'X', '/']
        if(currentEntry !== ''){
            if(currentEntry.indexOf('.') !== -1){
                if(currentEntry.split('.').length !== 2){
                    currentEntry = currentEntry.split('.') + '.' + 0
                }
            }
            entries.push(parseFloat(currentEntry));
            carryOutOperation();
            currentEntry = '';
        }
        if(controls.includes(entries[entries.length - 1])){
            //if new operations is pressed
            entries.splice(entries.length -1 , 1);
            entries.push(operation);
            textContainer.innerHTML = entries.join(' ')
            return;
        }
            
        entries.push(operation)
        textContainer.innerHTML = entries.join(' ')
        calculateResult()
    }
    var carryOutOperation = function(){
        controls = ['DEL', '-', '+', 'X', '/']
        if(controls.includes(entries[entries.length - 1]))
            return;
        var currentOperation = '';
        result = entries[0];
        for(var i =1; i < entries.length; i++){
            if(typeof entries[i] === 'number'){
                if(currentOperation != ''){
                    switch(currentOperation){
                        case '+':
                            result += entries[i];
                            resultContainer.innerHTML = numberWithCommas(''+result)
                            break;
                        case '-':
                            result -= entries[i]
                            resultContainer.innerHTML = numberWithCommas(''+result);
                            break;
                        case 'X':
                            result *= entries[i]
                            resultContainer.innerHTML = numberWithCommas(''+result);
                            break;
                        case '/':
                            result /= entries[i]
                            resultContainer.innerHTML = numberWithCommas(''+result);
                            break;
                    }
                }
            }else{
                currentOperation = entries[i]
            }

        }
    }
    var numberWithCommas = function (x) {
        var parts = x.split(".");
        if(parts.length <= 2){
            parts[0] = parts[0].replace(/\B(?=(\d{3})+(?!\d))/g, ",");
            return parts.join('.')
        }
        var floatingpoints = '';
        for(var i = 1; i < parts.length; i++){
            floatingpoints += parts[i]
        }
        var stringArray = [parts[0], floatingpoints]
        stringArray[0] = stringArray[0].replace(/\B(?=(\d{3})+(?!\d))/g, ",");
        return stringArray.join(".");
    }
    return uiCanInteract
}

var _init_ = startApp()
