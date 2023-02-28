import React from "react";
import { render } from "@testing-library/react-native";
import { Input } from ".";

describe('Input Component', () => {

    test('check if the input is active', () => {
        const { getByTestId } = render(<Input testID="input-test" />)
        const inputComponent = getByTestId('input-test')
        expect(inputComponent.props.active).toEqual(false)
    })

})