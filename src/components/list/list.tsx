
import { ListWrapper } from "./list.styles";

export const List = ({ children }: { children: React.ReactNode }) => {
    return (
        <ListWrapper desktopCols={true ? [3, 11] : [1, 7]}>
            {children}
        </ListWrapper>
    );
};
