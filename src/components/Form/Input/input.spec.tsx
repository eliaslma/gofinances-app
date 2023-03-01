import React from "react";
import { render } from "@testing-library/react-native";
import { Input } from ".";
import { ThemeProvider } from "styled-components/native";
import theme from "@myApp/global/styles/theme";

const Providers = ({ children }) => (
    <ThemeProvider theme={theme}>
        {children}
    </ThemeProvider>
);

describe('Input Component', () => {

    test('check if the input is active', () => {
        const { getByTestId } = render(
            <Input testID="input-test" />,
            { wrapper: Providers}
        )
        const inputComponent = getByTestId('input-test')
        expect(inputComponent.props.active).toEqual(false)
    })

})