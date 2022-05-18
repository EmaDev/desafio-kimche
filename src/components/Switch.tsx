import { FC, useState } from 'react';
import { Theme } from '../interfaces/themeInterface';
import { themes } from '../themes/theme';
import { ButtonSwitch, SwitchBGC, SwitchContainer, SwitchWrapper } from './Switch.element';

interface Props {
    theme: string;
    setTheme: (theme:Theme) => void;
}
export const Switch:FC<Props> = ({theme, setTheme}) => {
    const [position, setPosition] = useState<boolean>(false);
    
    const changeTheme = () => {
        if(theme === 'Light'){
            setTheme(themes.dark);
            document.body.style.backgroundColor = themes.dark.bgPrimary
        }else{
            setTheme(themes.light);
            document.body.style.backgroundColor = themes.light.bgPrimary
        }
        setPosition(!position);
    }

    return (
    <>
    <SwitchContainer>
        <SwitchWrapper>
            <SwitchBGC onClick={changeTheme}>
                <ButtonSwitch
                position={position}
                ></ButtonSwitch>
            </SwitchBGC>
        </SwitchWrapper>
    </SwitchContainer>
    </>
  )
}
