import {Link} from 'react-router-dom';
import formMode from '../../helpers/formHelper';

function FormButton(props) {

    const submitButtonLabel = props.formMode === formMode.NEW ? 'Dodaj' : 'Edytuj'


    return (
        <div className='form-buttons'>
            <p id='errorsSummary' className='errors-text'>{props.error}</p>
            <input className='form-button-submit' type="submit" value={submitButtonLabel}/>
            <Link to={props.cancelPath} className='form-button-cancel'>Anuluj</Link>
        </div>
    )
}

export default FormButton