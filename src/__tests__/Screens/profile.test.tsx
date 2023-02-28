import React from "react";
import { render } from "@testing-library/react-native"
import { Profile } from "@myApp/screens/Profile";

describe('Screen: Profile', () => {

    test('verify placeholder are in screen', () => {
        const { getByPlaceholderText } = render(<Profile />)
        const inputName = getByPlaceholderText('Sobrenome')
        expect(inputName).toBeTruthy();
    })

    test('checks if user data has been loaded', () => {
        const { getByTestId } = render(<Profile />)
        const inputName = getByTestId('input-name')
        const inputLastName = getByTestId('input-lastname')
        expect(inputName.props.value).toBeTruthy()
        expect(inputLastName.props.value).toEqual(undefined)
    })

    test('check if profile content exists', () => {
        const { getByTestId } = render(<Profile />)
        const text = getByTestId('text-perfil')
        expect(text.props.children).toContain('Perfil')
    })

})

describe('Screen: Home', () => {
    test('test', () => { })
})

