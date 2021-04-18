import './CreateRecipe.css'
import axios from 'axios'
export const CreateRecipe=(props)=>{
    const sendRecipe=(e)=>{
    e.preventDefault();
    console.log(e);
    const ingredients=Array.from(document.getElementById("IngredientItems").children)
    const instructions=Array.from(document.getElementById("InstructionItems").children)

    const data={
        "id":props.id,
        "image":e.target[0].value,
        "name":e.target[1].value,
        "description":e.target[2].value,
        "cuisine":e.target[3].value,
        "Ingredients": [],
        'Instructions':[]
        
    }
    ingredients.map((ingredient,index)=>{
        const name=ingredient.children[0].value;
        const amount=ingredient.children[1].value;
        data['Ingredients'][index]={
            "name":name,
            "amount":amount
        }

    })
    instructions.map((ingredient,index)=>{
        const name=ingredient.children[0].value;
        data['Instructions'][index]=name
    })
    console.log(e)
    axios.post("/AddRecipe", data)
}
    return(
        <div className="CreateRecipe">
            user: {props.id}
            <CreateRecipeForm func={sendRecipe}/>
        </div>
    )
}

const CreateRecipeForm=(props)=>{
    const FormItem=(props)=>{
        return(
            <div className="FormItem">
                {(props.type!='submit')  && <label>{props.message}</label>}
                <input type={props.type} placeholder={props.value}></input>
            </div>
        )
    }
    const OptionItem=(props)=>{
        const OptionItemItem=(props)=>{
            return(
                <option value={props.value}>{props.item}</option>
            )
        }
        return(
            <div className="OptionItem">
                <label for="myfile">{props.message}</label>
                <select>
                    <OptionItemItem value="chinese" item="Chinese"/>
                    <OptionItemItem value="chinese" item="Japanese"/>
                    <OptionItemItem value="chinese" item="Italian"/>
                    <OptionItemItem value="chinese" item="American"/>
                    <OptionItemItem value="chinese" item="Australian"/>
                </select>
            </div>
        )
    }
    const Ingredients=()=>{
        const addIngredient=(e)=>{
            e.preventDefault();
            const ingredient=document.getElementById("ingredient_name");
            const ingredients=Array.from(document.getElementById("IngredientItems").children)
            for (var i = 0; i < ingredients.length; i++) {
                const name=ingredients[i].children[0].value;
                if (name===ingredient.value){
                    alert("Duplicate Ingredient Detected")
                    return
                    
                }
            } 
            const amount = document.getElementById("ingredient_amount");
            const container = document.getElementById("IngredientItems");
            var div=document.createElement("div");
            div.classList.add("Ingredient");
            
            var IngredientName=document.createElement("INPUT");
            
            IngredientName.classList.add("Ingredient_Name");
            IngredientName.setAttribute("type", "text");
            IngredientName.setAttribute("value", ingredient.value);
            IngredientName.readOnly = true;
            IngredientName.onclick=()=>{
                IngredientName.readOnly= !IngredientName.readOnly
            }
            var IngredientAmount=document.createElement("INPUT");
            
            IngredientAmount.classList.add("Ingredient_Amount")
            IngredientAmount.setAttribute("type", "text");
            IngredientAmount.setAttribute("value", amount.value);
            IngredientAmount.readOnly = true;
            IngredientAmount.onClick=()=>{
                IngredientAmount.readOnly= !IngredientAmount.readOnly
            }
            
            div.appendChild(IngredientName);
            div.appendChild(IngredientAmount)
            container.appendChild(div)
        }
        return(
        <div className="Ingredients">
            <label>Ingredients: </label> <br/>
            <label>Ingredients Name: </label>
            <input type="text" id="ingredient_name" placeholder="test"  /> <br/>
            
            <label>Ingredients Amount: </label>
            <input type="text" id="ingredient_amount" placeholder="5"/>  <br/>
            <button type ="button" onClick={addIngredient}>Add Ingredient</button>
            <div className="IngredientItems" id="IngredientItems" ></div>
        </div>
        )
    }
    const Instructions=()=>{
        
        const addInstructions=(e)=>{
            e.preventDefault();
            const instruction=document.getElementById("ingredient_name");
            const container=document.getElementById("InstructionItems");
            var div=document.createElement("div");
            div.classList.add("Instruction")
            var newInstruction=document.createElement("INPUT");
            
            newInstruction.classList.add("Ingredient_Name");
            newInstruction.setAttribute("type", "text");
            newInstruction.setAttribute("value", instruction.value);
            newInstruction.readOnly = true;
            newInstruction.onclick=()=>{
                newInstruction.readOnly= !newInstruction.readOnly
            }
            div.appendChild(newInstruction)
            container.appendChild(div)


        }
        return(
        <div className="Instructions">
            <label>Instructions: </label> <br/>
            <input type="text" id="instruction" placeholder="test"  /> <br/>

            <button type ="button" onClick={addInstructions}>Add Instruction</button>
            <div className="InstructionItems" id="InstructionItems" ></div>
        </div>
        )
    }
    return (
        <form className="CreateRecipeForm" onSubmit={props.func}> {props.children}
            <FormItem type='input' message="Image_URL: "  value="file_Url"/>
                <FormItem type="input" message="Recipe Name: " value="name"/>
                <FormItem type='input' message= "Description: " value="description"/>
                <OptionItem  message= "Cuisine: "/>
                <Ingredients/>
                <Instructions/>
                <FormItem type="submit" value="Submit Recipe"/>

        </form>
    )
}


