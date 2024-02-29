import { ContentWrapper, Page, PageBody } from "./template-page.styles";

interface ITemplatePageProps {
    children: React.ReactNode;
}

export const TemplatePage = (props: ITemplatePageProps) => {
    const { children } = props;

    return (
        <Page>
            <PageBody>
                <ContentWrapper>{children}</ContentWrapper>
            </PageBody>
        </Page>
    );
};
