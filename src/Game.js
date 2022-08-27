export default  class Game {
    constructor(){
        this.moves = []
        this.board = [
            [2, 2, 1, 1, 1, 2, 2],
            [2, 1, 1, 1, 1, 1, 2],
            [1, 1, 1, 1, 1, 1, 1],
            [1, 1, 1, 0, 1, 1, 1],
            [1, 1, 1, 1, 1, 1, 1],
            [2, 1, 1, 1, 1, 1, 2],
            [2, 2, 1, 1, 1, 2, 2]
        ]
        this.remainingMarbles = 36
    }

    isInBounds(position){
        if(0 <= position[0] && position[0] < 7 && 0 <= position[1] && position[1] < 7){
            return this.board[position[0]][position[1]] != 2;
        }
        return false;
    }

    isMarbleAtPosition(position){
        return this.isInBounds(position) && this.board[position[0]][position[1]] == 1
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
            this.board[dest[0]][dest[1]] = 1
            this.board[source[0]][source[1]] = 0
            var middle_pos = this.get_middle_position(source, dest)
            this.board[middle_pos[0]][middle_pos[1]] = 0
            this.recordMove(source, dest)
            return true
        }
        return false
    }
}