
    
    var board=[0,0,0,0,0,0,0,0,0];     
    var cells=[];
    var endOfGame=false;
    
    /*Verfifico que la posici�n est� vac�a*/
    function verifyEmpty(position){
        if(board[position]===0){
            return true;
        }
        return false;        
    };
 
    /*Obtengo la jugada de la computadora*/
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
    
    
/*Verifico si me quedan celdas vac�as*/
    function cellsLeft(){
        for(var i=0; i<board.length; i++){
            if (verifyEmpty(i)){
                return true;
            }
        }
            return false;
    };

/*Dibujo el movimiento*/
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
    }
    
/*Juegan por turnos*/    
    function playGame(position){
        if (!endOfGame){                           /*Si no se ha acabado el juego*/
            if (verifyEmpty(position)){          /*Si la casilla est� vac�a*/
                board[position]=1;              /*Marca la posici�n en el tablero*/
                drawMovements();
                if (!cellsLeft()){               /*Si ya no quedan celdas vac�as*/
                    endOfGame=true;
                    alert("Se ha llenado el tablero 1"); 
                }
                else {                           /*Si todav�a quedan celdas vac�as*/
                    movementComputer();         /*Juega la computadora*/
                    drawMovements();
                    if (!cellsLeft()){           /*Si ya no quedan celdas vac�as*/
                        endOfGame=true;         /*Se acaba el juego*/
                        alert("Se ha llenado el tablero 2");
                    }
                    else{                        /*Si todav�a quedan celdas vac�as*/            
                        alert("Turno del jugador 1");   /*Juega el usuario*/

                    }
                }
            }
            else {
                alert("Casilla ocupada");
            }
            
        }
        if (endOfGame){                     /*Si ya se acab� el juego*/
            alert("Game Over");
        }
    };    
 
/*Asocio la funci�n playGame(posicion) como acci�n para el evento onclick de cada celda*/
    window.onload=function(){               
        for (var i = 0; i < board.length; i++) {
            cells[i]=document.getElementById("cell"+i);
            cells[i].onclick=function(e){
                playGame(parseInt(this.getAttribute("id").charAt(4))); 
            };
        };
    };
    
