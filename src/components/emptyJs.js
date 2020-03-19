import NameInput from './NameInput.js';

<form action="..." method="..."></form>
    <NameInput ph="hey, gimme name" />
    <input type="submit" value="create new account" />
</form>



nameInputComponent.js

export default function NameInput(props) {
    ....
    ....
    

    return(
        <div>
        <label>Your name</label>
        <input type="text" placeholder={props.ph} />
    </div>
    )
}