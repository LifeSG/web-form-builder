import { DragHandleIcon, EllipsisHorizontalIcon } from "@lifesg/react-icons";
import { BaseCard } from "../common";
import { Container, PageTitle } from "./page-button-card.styles";
import { IPage } from "src/schemas";
import { useBuilder } from "src/context-providers";

interface IProps {
    page: IPage;
}

export const PageButtonCard = ({ page }: IProps) => {
    const { currentPage } = useBuilder();

    const renderDragger = () => {
        // TODO: has dnd logic
        return <DragHandleIcon />;
    };

    const renderOptions = () => {
        // TODO: renders popover
        return <EllipsisHorizontalIcon />;
    };

    return (
        <BaseCard focused={currentPage.id === page.id}>
            <Container>
                {/* {renderDragger()} */}
                <PageTitle>{page.title}</PageTitle>
                {/* {renderOptions()} */}
            </Container>
        </BaseCard>
    );
};
