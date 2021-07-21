import JSONInput from 'react-json-editor-ajrm';
import locale from 'react-json-editor-ajrm/locale/en';
import * as React from 'react';
import Backdrop from '@material-ui/core/Backdrop';
import Box from '@material-ui/core/Box';
import Modal from '@material-ui/core/Modal';
import Fade from '@material-ui/core/Fade';
import Button from '@material-ui/core/Button';
import SendIcon from '@material-ui/icons/Send';
import create from 'zustand'


const style = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: 'fit-content',
    bgcolor: 'background.paper',
    border: '2px solid #000',
    boxShadow: 24
};

const jsonDefaultValue = {
    standardPlan: {
        label: 'Standard Plan',
        general: true,
        specialist: true,
        physiotherapy: false,
        psychotherapy: false,
        consultation: false,
        monthlyPricing: 0,
        unit: 'HKD'
    },
    premiumPlan: {
        label: 'Premium Plan',
        general: true,
        specialist: true,
        physiotherapy: true,
        psychotherapy: false,
        consultation: false,
        monthlyPricing: 388,
        unit: 'HKD'
    },
    vipPlan: {
        label: 'VIP Plan',
        general: true,
        specialist: true,
        physiotherapy: true,
        psychotherapy: true,
        consultation: false,
        monthlyPricing: 788,
        unit: 'HKD'
    }
}

export const useStore = create(set => ({
    json: jsonDefaultValue,
    setJson: (json) => set({json})
  }))


export default function JSONEditorModal() {
    const [open, setOpen] = React.useState(false);
    const handleOpen = () => setOpen(true);
    const handleClose = () => {
        setOpen(false)
        setPaddingJson(placeholder)
        setDisabled(false)
    };

    const [disabled, setDisabled] = React.useState(false)
    const [placeholder, setPlaceholder] = React.useState(jsonDefaultValue)
    const [paddingJson, setPaddingJson] = React.useState(jsonDefaultValue)
    const onChange = (res) => {
        const { jsObject, error } = { ...res }
        error ? setDisabled(true) : setDisabled(false)
        jsObject && setPaddingJson(jsObject)
    }

    const json = useStore(state => state.json)
    const setJson = useStore(state => state.setJson)
    const onClick = () => {
        setJson(paddingJson)
        setPlaceholder(paddingJson)
        handleClose()
    }

    React.useEffect(() => {
        console.log('Current json', json);
    }, [json])

    return (
        <div>
            <Button onClick={handleOpen}>Edit JSON</Button>
            <Modal
                aria-labelledby="transition-modal-title"
                aria-describedby="transition-modal-description"
                open={open}
                onClose={handleClose}
                closeAfterTransition
                BackdropComponent={Backdrop}
                BackdropProps={{
                    timeout: 500,
                }}
            >
                <Fade in={open}>
                    <Box sx={style}>
                        <JSONInput
                            id='a_unique_id'
                            placeholder={placeholder}
                            locale={locale}
                            onChange={onChange}
                            waitAfterKeyPress={100}
                        />
                        <Button onClick={onClick} disabled={disabled} variant="contained" fullWidth endIcon={<SendIcon />} sx={{ borderRadius: '0' }}>
                            Submit
                        </Button>
                    </Box>
                </Fade>
            </Modal>
        </div>
    );
}