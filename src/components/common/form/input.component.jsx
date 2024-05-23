import { useEffect, useState } from "react"
import { Form, InputGroup } from "react-bootstrap"
import { Controller, useController } from "react-hook-form"
import Select from "react-select"
import CreatableSelect from "react-select/creatable"


export const TextAreaInput = ({ name, defaultValue = "", id = "text", required = false, placeholder = "Enter your text", errMsg = "", control }) => {
    const { field } = useController({
        control: control,
        name: name,
        defaultValue: defaultValue
    })
    return (
        <>
            <Form.Control
                as={'textarea'}
                size="sm"
                rows={5}
                style={{ resize: 'none' }}
                required={required}
                id={id}
                {...field}
                placeholder={placeholder}
            >

            </Form.Control>
            <span className="text-danger">
                {errMsg}
            </span>
        </>
    )
}

export const TextInput = ({ type = 'text', name, defaultValue = "", id = "text", required = false, placeholder = "Enter your text", errMsg = "", control }) => {
    const { field } = useController({
        control: control,
        name: name,
        defaultValue: defaultValue
    })
    return (
        <>
            <Form.Control
                type={type}
                size="sm"
                required={required}
                id={id}
                {...field}
                placeholder={placeholder}
            >

            </Form.Control>
            <span className="text-danger">
                {errMsg}
            </span>
        </>
    )
}

export const NumberInput = ({ min = 0, name, defaultValue = 0, id = "text", placeholder = "Enter your text", errMsg = "", control }) => {
    const { field } = useController({
        control: control,
        name: name,
        defaultValue: defaultValue
    })
    return (
        <>
            <Form.Control
                type={'number'}
                size="sm"
                min={min}
                id={id}
                {...field}
                placeholder={placeholder}
            >

            </Form.Control>
            <span className="text-danger">
                {errMsg ? errMsg : null}
            </span>
        </>
    )
}

export const SwitchCase = ({ name, defaultValue = false, id = "text", errMsg = "", control }) => {
    const { field } = useController({
        control: control,
        name: name,


    })
    const [checked, setChecked] = useState()

    useEffect(() => {
        setChecked(defaultValue)
    }, [defaultValue])

    return (
        <>
            <Form.Check
                type="switch"
                defaultChecked={checked}
                id={id}
                label={"Yes"}
                onChange={(e) => {
                    const isChecked = e.target.checked
                    setChecked(isChecked)
                    field.onChange(checked)
                }}
            />
            <span className="text-danger">
                {errMsg}
            </span>
        </>
    )
}
//same as the above one but in a different way

export const TextControllerInput = ({ type = 'text', name, defaultValue = "", id = "text", required = false, placeholder = "Enter your text", errMsg = "", control }) => {

    return (
        <>
            <Controller
                control={control}
                name={name}
                defaultValue={defaultValue}
                render={(field) => {
                    return <>
                        <Form.Control
                            type={type}
                            size="sm"
                            required={required}
                            id={id}
                            {...field}
                            placeholder={placeholder}
                        >

                        </Form.Control>
                        <span className="text-danger">
                            {errMsg}
                        </span>

                    </>
                }}
            />
        </>
    )

}

export const SelectDropdownInput = ({ name, id = "select", options = [], errMsg = null, control, multiple = false }) => {
    const { field } = useController({
        control: control,
        name: name
    })
    return (
        <>

            <Select
                {...field}
                options={options}
                id={id}
                isMulti={multiple}
                isClearable={true}
            />

            <span className="text-danger">
                {errMsg}
            </span>
        </>
    )
}


export const TagInput = ({ name, id = "tag", options = [], errMsg = null, control, multiple = false }) => {
    const { field } = useController({
        control: control,
        name: name
    })
    return (
        <>

            <CreatableSelect
                {...field}
                options={options}
                id={id}
                isMulti={multiple}
            />

            <span className="text-danger">
                {errMsg}
            </span>
        </>
    )
}


export const DropDownInput = ({ name, id = "text", options = [], control, defaultValue = "", errMsg = null }) => {
    const { field } = useController({
        control: control,
        name: name,
        defaultValue: ""
    })
    return (
        <>
            <InputGroup className="mb-3">
                <Form.Select
                    id={id}
                    size="sm"
                    {...field}>
                    <option value="">---SELECT ANY ONE---</option>
                    {
                        options && options.map((item, key) => (
                            <option key={key} value={item.value}>
                                {item.label}
                            </option>
                        ))
                    }

                </Form.Select>
            </InputGroup>
            <span className="text-danger">
                {errMsg}
            </span>
        </>
    )
}

export const MultipleFileUpload = ({ name, setValue, setError, errMsg, setThumb, allowed = ['jpg', 'jpeg', 'png', 'svg', 'webp', 'bmp'], required = false }) => {
    return (
        <>
            <Form.Control
                type="file"
                size="sm"
                required={required}
                multiple={true}
                onChange={(e) => {
                    const images = Object.values(e.target.files)

                    let uploadableImages = []
                    if (images) {
                        images.map((image) => {
                            const ext = image.name.split(".").pop()
                            if (allowed.includes(ext.toLowerCase())) {
                                if (image.size <= 3000000) {
                                    uploadableImages.push(image)
                                }
                                else {
                                    setError([name], "File size should be less than 3MB")
                                }
                            }
                            else {
                                setError([name], "Invalid file format")
                            }
                        })
                        setValue(name, uploadableImages)
                        setThumb(uploadableImages)
                    }

                }}

            />
            <span className="text-danger">
                {errMsg}
            </span>
        </>

    )
}