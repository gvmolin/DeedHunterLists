function accordion(element){
    if(element.parentElement.children[1].style.display === 'none'){
        element.parentElement.children[1].style.display = 'flex'
    }
    else{
        element.parentElement.children[1].style.display = 'none'
    }
    
}