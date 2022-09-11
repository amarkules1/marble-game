export default  class Game {
    constructor(){
        this.moves = []
        this.board = [
            [-1, -1, 1, 2, 3, -1, -1],
            [-1, 4, 5, 6, 7, 8, -1],
            [9, 10, 11, 12, 13, 14, 15],
            [16, 17, 18, 37, 19, 20, 21],
            [22, 23, 24, 25, 26, 27, 28],
            [-1, 29, 30, 31, 32, 33, -1],
            [-1, -1, 34, 35, 36, -1, -1]
        ]
        this.remainingMarbles = 37
    }

    clone(){
        let newGame = new Game()
        newGame.board = this.board
        newGame.moves = this.moves
        newGame.remainingMarbles = this.remainingMarbles
        return newGame
    }

    isInBounds(position){
        if(0 <= position[0] && position[0] < 7 && 0 <= position[1] && position[1] < 7){
            return this.board[position[0]][position[1]] != -1;
        }
        return false;
    }

    isMarbleAtPosition(position){
        return this.isInBounds(position) && this.board[position[0]][position[1]] > 0
    }

    isDistanceTwoAppart(source, dest){
        if(source[0] == dest[0]){
            return Math.abs(source[1] - dest[1]) == 2
        } else if (source[1] == dest[1]){
            return Math.abs(source[0] - dest[0]) == 2
        }
        return false
    }

    getMiddlePosition(source, dest){
        return [Math.floor((source[0] + dest[0]) / 2), Math.floor((source[1] + dest[1]) / 2)]
    }

    isValidMove(source, dest){
        if(!this.isInBounds(source)){
            return false
        }
        if(!this.isInBounds(dest)){
            return false
        }
        if(!this.isMarbleAtPosition(source)){
            return false
        }
        if(this.isMarbleAtPosition(dest)){
            return false
        }
        if(!this.isDistanceTwoAppart(source, dest)){
            return false
        }
        if(!this.isMarbleAtPosition(this.getMiddlePosition(source, dest))){
            return false
        }
        return true
    }

    recordMove(source, dest){
        this.moves.push([source,dest])
        this.remainingMarbles = this.remainingMarbles - 1
    }

    moveMarble(source, dest){
        if(this.isValidMove(source, dest)){
            this.board[dest[0]][dest[1]] = this.board[source[0]][source[1]]
            this.board[source[0]][source[1]] = 0
            var middle_pos = this.getMiddlePosition(source, dest)
            this.board[middle_pos[0]][middle_pos[1]] = 0
            this.recordMove(source, dest)
            return true
        }
        return false
    }

    getMovesForPosition(pos){
        let possibleMoves = []
        if(this.isMarbleAtPosition(pos)){
            if(this.isValidMove(pos, [pos[0], pos[1] - 2])){
                possibleMoves.push([pos, [pos[0], pos[1] - 2]])
            }
            if(this.isValidMove(pos, [pos[0], pos[1] + 2])){
                possibleMoves.push([pos, [pos[0], pos[1] + 2]])
            }
            if(this.isValidMove(pos, [pos[0] + 2, pos[1]])){
                possibleMoves.push([pos, [pos[0] + 2, pos[1]]])
            }
            if(this.isValidMove(pos, [pos[0] - 2, pos[1]])){
                possibleMoves.push([pos, [pos[0] - 2, pos[1]]])
            }
        }
        return possibleMoves
    }
    
    removeMarble(row, col){
        if(this.remainingMarbles == 37){
            this.board[row][col] = 0
            this.remainingMarbles = 36
        }
    }

    isAnyPossibleMoves(){

        for(let i = 0; i < 7; i++){
            for(let j = 0; j < 7; j++){
                if(this.getMovesForPosition([i,j]).length > 0){
                    return true
                }
            }
        }
        return false
    }
}