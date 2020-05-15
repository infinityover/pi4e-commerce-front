function setCart(state={cart:[]}, action){
    let same = false;
    switch(action.type){
        case 'ADD':
            state.cart.map(ele => {
                if(ele.id === action.product.id){
                    if(ele.qt < action.product.quantity){
                        ele.qt++;
                    }
                    same = true;
                }
                return ele;
            })
            if(same) {
                console.log(state)
                return { ...state };
            }
            else {
                action.product["qt"] = 1;
                return { cart:state.cart.concat(action.product) } 
            }

        case 'REMOVE':

            const index =  state.reduce((reducer,actual, index) => {
                if(action.id === actual.id) return index
                else return reducer
            })
            return state.slice(index,1)
        case 'ADDQUANTITY':
            return state.map(ele => {
                if(ele.id === action.product.id){
                    ele.qt++;
                }
            })
        case 'REMOVEQUANTITY':
            return state.map((ele,index) => {
                if(ele.id === action.id){
                    ele.qt--;
                }
            })
        case 'ALTQUANTITY':

        if(action.qt == 0){
            let idx =-1;
            state.cart.map((ele,index) => {
                if(action.id = ele.id) idx = index;
            });
            if(idx >= 0) state.cart.splice(idx,1);

        }else{
            state.cart.map(ele => {
                if(ele.id === action.id && action.qt < ele.quantity){
                    ele.qt = action.qt;
                }
                return ele;
            })
        }

            return {...state}
        case 'CLEANCART':
            return {cart: []}
                
        default:
            return state;
    }
}


export default setCart;