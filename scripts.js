/*
 * Arquivo: scripts.js
 * Autor: Paulo Alves
 * Descrição: responsável pela criação de componentes e execução jogo utilizando conceitos da orientação a objetos
 * Data: 06/11/2019
*/

let field, player

class Field{
    constructor(cols, rows, containerId) {
        this.cols = cols
        this.rows = rows
        this.container = document.querySelector(containerId)
        this.createField()
    }

    createField(){
        let field = []
        for(let i = 0; i < this.rows; i++){
            field[i] = []
            for(let j = 0; j < this.cols; j++){
                field[i].push(this.createRock())
            }
        }
        this.field = field
        this.drawField()
    }

    createRock(){
        return Math.trunc(Math.random() * 5) === 1 ? '@' : ''
    }

    drawField(){
        let template = ''
        for(let i = 0; i < this.rows; i++){
            template += '<tr>'
            for(let j = 0; j < this.cols; j++){
                template += `<td>${this.field[i][j]}</td>`
            }
            template += '</tr>'
        }
        this.container.innerHTML = template
    }
    
}

class Character{
    constructor(field, x, y, face){
        this.face = face
        this.x = x
        this.y = y
        this.table = field
        if(!this.setPosotion(this.x, this.y)){
            throw Error()
        }        
    }

    up(){
        if(this.y > 0){
            this.setPosotion(this.x, this.y - 1)
        }
    }

    down(){
        if(this.y+1 < this.table.rows){
            this.setPosotion(this.x, this.y + 1)
        }
    }

    left(){
        if(this.x > 0){
            this.setPosotion(this.x - 1, this.y)
        }
    }

    right(){
        if(this.x+1 < this.table.cols){
            this.setPosotion(this.x + 1, this.y)
        }
    }

    setPosotion(x, y){
        if(this.table.field[y][x] === ''){
            this.table.field[this.y][this.x] = ''
            this.x = x
            this.y = y
            this.table.field[this.y][this.x] = this.face
            this.table.drawField()
            return true
        }
        return false
    }
}

class Player extends Character{
    constructor(field){
        super(field, 0, 0, 'o_o')
    }
}




