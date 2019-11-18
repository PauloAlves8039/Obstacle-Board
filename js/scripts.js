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

class Npc extends Character{
    constructor(field){
        let x = Math.trunc(Math.random()*field.cols),
            y = Math.trunc(Math.random()*field.rows)
        
        super(field, x, y, '-_-')
        setInterval(this.walk.bind(this), 500)
    }
    
    walk(){
        let direction = Math.trunc(Math.random()*4) + 1
        switch(direction){
            case 1:
                this.up()
                break
            case 2:
                this.down()
                break
            case 3:
                this.right()
                break
            case 4:
                this.left()
                break
        }
    }
}

function startField(){
    let cols = document.querySelector('#cols').value || 3,
        rows = document.querySelector('#cols').value || 3

    document.querySelector('button').disabled = true

    field = new Field(cols, rows, '#myTable')
    try{
        player =  new Player(field)
    }catch(e){
        console.log('starting field again!')
        startField()
    }
    
}

function resetField(){
    location.reload()    
}

window.addEventListener('keyup', function(event){
    if(player){
        const A = 65,
              S = 83,
              D = 68,
              W = 87
        switch(event.keyCode){
            case A:
                player.left()
                break
            case S:
                player.down()
                break
            case D:
                player.right()
                break
            case W:
                player.up()
                break
        }
    }
})


