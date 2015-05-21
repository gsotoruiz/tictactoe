    var board=[0,0,0,0,0,0,0,0,0];     
    var cells=[];
    var endOfGame=false;
    var btnHint;
    var btnReplay; 
    var divMessage;
    function verifyEmpty(position){
        if(board[position]===0){
            return true;
        }
        return false;        
    };
    function movementComputer(){
        var position;
        if(cellsLeft()){
            do{    
                position=Math.floor(Math.random()*9);
            }while(!verifyEmpty(position)); 
            board[position]=2;
        }
        else {
            endOfGame=true;
        }
    };
    function cellsLeft(){
        for(var i=0; i<board.length; i++){
            if (verifyEmpty(i)){
                return true;
            }
        }
            return false;
    };
    function  drawMovements(){
        for(var i=0; i<board.length; i++){
            if (board[i]===0) {
                cells[i].innerHTML="";
            };
            if (board[i]===1){
                cells[i].innerHTML="<font color='red'>x</font>";
            };
            if(board[i]===2){
                cells[i].innerHTML="<font color='blue'>o</font>";
            };
        }        
    };
    function playGame(position){
        var resultado;
        hide(divMessage);
        if (!endOfGame){                           
            if (verifyEmpty(position)){         
                board[position]=1;              
                drawMovements();
                if (verifyWin(1)){              
                    endOfGame=true;
                    resultado="¡Felicidades¡ Has ganado el juego"; 
                }
                else if (!cellsLeft()){               
                    endOfGame=true;
                    resultado="Se ha llenado el tablero. ¡Es un empate!";
                }
                else {                          
                    movementComputer();         
                    drawMovements();
                    if(verifyWin(2)){               
                        endOfGame=true;
                        resultado="Ha ganado la computadora";
                    }
                    else if (!cellsLeft()){           
                        endOfGame=true;         
                        resultado="Se ha llenado el tablero. ¡Es un empate!";
                    }
                    else{                                   
                        displayMessage("Turno del jugador 1");                       }
                }
            }
            else {
                displayMessage("Casilla ocupada");
            }
            
        }
        if (endOfGame){                    
            displayMessage(resultado);
            show(btnReplay);
            hide(btnHint);
        }
    }; 
    function verifyWin(player){
        if((board[0]===player && board[1]===player && board[2]===player) ||
            (board[3]===player && board[4]===player && board[5]===player) ||
            (board[6]===player && board[7]===player && board[8]===player) ||
            (board[0]===player && board[3]===player && board[6]===player) ||
            (board[1]===player && board[4]===player && board[7]===player) ||
            (board[2]===player && board[5]===player && board[8]===player) ||
            (board[0]===player && board[4]===player && board[8]===player) ||
            (board[2]===player && board[4]===player && board[6]===player)){
            return true;
                };
        return false;  
    };
    function blink(element){  
        for(var i=500; i < 3500; i+=500){
	setTimeout(hide,i, element);
	setTimeout(show,i+250, element);
        }
    };   
    function show(element){
	element.style.visibility = "visible";
    };
    function hide(element) 
    {
	element.style.visibility = "hidden";
    };
    function replay(){
        for(var i=0; i<board.length; i++){
            board[i]=0;
        }
        hide(btnReplay);
        show(btnHint);
        drawMovements();
        endOfGame=false;
        displayMessage("A jugar");
    };
    function hint(){
        var position;
        if(!endOfGame && cellsLeft()){  
            do{    
                position=Math.floor(Math.random()*9);
            }while(!verifyEmpty(position)); 
            var pista=document.getElementById("cell"+position);
            blink(pista);
        }
    };
   function displayMessage(message){
       show(divMessage);
       divMessage.innerHTML=message;
   }
    window.onload=function(){               
        for (var i = 0; i < board.length; i++) {
            cells[i]=document.getElementById("cell"+i);
            cells[i].onclick=function(e){
                playGame(parseInt(this.getAttribute("id").charAt(4)));   
            };
        };
        btnHint=document.getElementById("hint");
        btnReplay=document.getElementById("replay");
        hide(btnReplay);
        divMessage=document.getElementById("message");
    };
    
