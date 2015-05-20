
    
    var board=[0,0,0,0,0,0,0,0,0];     
    var cells=[];
    var endOfGame=false;
    
    /*Verfifico que la posición está vacía*/
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
    
    
/*Verifico si me quedan celdas vacías*/
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
            if (verifyEmpty(position)){          /*Si la casilla está vacía*/
                board[position]=1;              /*Marca la posición en el tablero*/
                drawMovements();
                if (!cellsLeft()){               /*Si ya no quedan celdas vacías*/
                    endOfGame=true;
                    alert("Se ha llenado el tablero 1"); 
                }
                else {                           /*Si todavía quedan celdas vacías*/
                    movementComputer();         /*Juega la computadora*/
                    drawMovements();
                    if (!cellsLeft()){           /*Si ya no quedan celdas vacías*/
                        endOfGame=true;         /*Se acaba el juego*/
                        alert("Se ha llenado el tablero 2");
                    }
                    else{                        /*Si todavía quedan celdas vacías*/            
                        alert("Turno del jugador 1");   /*Juega el usuario*/

                    }
                }
            }
            else {
                alert("Casilla ocupada");
            }
            
        }
        if (endOfGame){                     /*Si ya se acabó el juego*/
            alert("Game Over");
        }
    };    
 
/*Asocio la función playGame(posicion) como acción para el evento onclick de cada celda*/
    window.onload=function(){               
        for (var i = 0; i < board.length; i++) {
            cells[i]=document.getElementById("cell"+i);
            cells[i].onclick=function(e){
                playGame(parseInt(this.getAttribute("id").charAt(4))); 
            };
        };
    };
    
