// import { yupResolver } from "@hookform/resolvers/yup";
// import { useCallback, useEffect, useState } from "react";
// import { Controller, FormProvider, useForm } from "react-hook-form";
// import { EElementType, EToastTypes, useDisplay } from "src/context-providers";
// import { SchemaHelper } from "src/schemas";
// import { EBuilderMode, useBuilder } from "../../context-providers";
// import { ElementEditor } from "../element-editor";
// import { AddElementsPanel } from "./add-elements-panel";
// import { SidePanelHeader } from "./side-panel-header";
// import { ContentSection, ContentWrapper, Wrapper } from "./side-panel.styles";
// import { Toolbar } from "./toolbar";
// import { Form } from "@lifesg/react-design-system/form";
// import { PopoverTrigger } from "@lifesg/react-design-system/popover-v2";

// interface IProps {
//     offset?: number;
// }

// export const SidePanel = ({ offset }: IProps) => {
//     // =========================================================================
//     // CONST, STATE, REFS
//     // =========================================================================
//     const {
//         showSidePanel,
//         currentMode,
//         focusedElement,
//         updateElement,
//         updateFocusedElement,
//     } = useBuilder();
//     const { showToast } = useDisplay();
//     const methods = useForm({
//         mode: "onTouched",
//         defaultValues: {
//             type: "",
//             label: "hello",
//             required: true,
//             requiredErrorMsg: "",
//             id: "",
//             placeholder: "",
//         },
//         // TODO: insert proper type; email is a placeholder
//         // resolver: yupResolver(SchemaHelper.buildSchema(EElementType.EMAIL)),
//     });

//     const { formState, control, getValues } = methods;

//     const { isSubmitSuccessful, isSubmitting, errors, isDirty } = formState;

//     const [data, setData] = useState();

//     // =========================================================================
//     // HELPER FUNCTIONS
//     // =========================================================================
//     const onSubmit = (values) => {
//         setData(values);
//         const newToast = {
//             message: "Changes are saved successfully.",
//             type: EToastTypes.SUCCESS_TOAST,
//         };
//         // updateElement(values);
//         // updateFocusedElement(false, values);
//         // showToast(newToast);
//     };
//     // =========================================================================
//     // USE EFFECTS
//     // =========================================================================

//     useEffect(() => {
//         if (isSubmitSuccessful) {
//             methods.reset(data);
//         }
//     }, [isSubmitSuccessful, methods.reset]);

//     // useEffect(() => {
//     //     if (!focusedElement || isSubmitting) {
//     //         return;
//     //     }
//     //     methods.reset(focusedElement.element);
//     // }, [focusedElement?.element, methods.reset]);

//     useEffect(() => {
//         console.log("IS SUBMIT SUCCESSFUL", formState.isSubmitSuccessful);
//         console.log("DEFAULT VALUES", formState.defaultValues);
//         console.log("Current vals", getValues());
//     }, [formState, data]);

//     // =========================================================================
//     // RENDER FUNCTIONS
//     // =========================================================================

//     const renderPanelContent = () => {
//         if (focusedElement) {
//             return (
//                 <>
//                     <Controller
//                         name="label"
//                         control={control}
//                         render={({ field }) => (
//                             <Form.Textarea
//                                 {...field}
//                                 required
//                                 label="Element Name"
//                                 rows={1}
//                                 placeholder="Element Name"
//                                 value={field.value}
//                                 onChange={(e) => {
//                                     field.onChange(e.target.value);
//                                 }}
//                                 maxLength={40}
//                             />
//                         )}
//                     />
//                     <PopoverTrigger
//                         popoverContent={"hello there"}
//                         trigger="hover"
//                         data-testid="add-button-popover"
//                     >
//                         <div>hi</div>
//                     </PopoverTrigger>
//                 </>
//             );
//         }
//         switch (currentMode) {
//             case EBuilderMode.ADD_ELEMENT:
//                 return <AddElementsPanel />;
//             default:
//                 return (
//                     <div data-testid="default-content">
//                         Some content here...
//                     </div>
//                 );
//         }
//     };

//     return (
//         <FormProvider {...methods}>
//             <form onSubmit={methods.handleSubmit(onSubmit)}>
//                 <Wrapper
//                     $minimised={focusedElement ? false : !showSidePanel}
//                     $offset={offset ? offset : 0}
//                 >
//                     <SidePanelHeader />
//                     <ContentWrapper>
//                         <ContentSection
//                             $isFocusedElement={focusedElement ? true : false}
//                         >
//                             {renderPanelContent()}
//                         </ContentSection>
//                         {focusedElement === null && <Toolbar />}
//                     </ContentWrapper>
//                 </Wrapper>
//             </form>
//         </FormProvider>
//     );
// };

import { PopoverTrigger } from "@lifesg/react-design-system/popover-v2";
import React, { useCallback, useEffect, useRef } from "react";
import { useForm, useFieldArray, Controller } from "react-hook-form";

let renderCount = 0;

const SidePanel = () => {
  const {
    register,
    control,
    handleSubmit,
    reset,
    formState,
    formState: { isDirty, dirtyFields },
    watch,
    getFieldState,
    formState: { isSubmitSuccessful },
  } = useForm({
    defaultValues: {
      something: "anything",
      firstName: "bill",
      lastName: "hello",
    },
    mode: "all",
  });
  // const { isDirty, dirtyFields } = formState;

  const [submittedData, setSubmittedData] = React.useState();
  const [show, setShow] = React.useState(false);

  const onSubmit = (data) => {
    setSubmittedData(data);
  };

  useEffect(() => {
    console.log(formState.isSubmitSuccessful);
    if (formState.isSubmitSuccessful) {
      reset(submittedData);
    }
  }, [formState, submittedData, reset]);

  const renderContent = () => {
    if (show) {
      return (
        <>
          <Controller
            render={({ field }) => {
              return <input {...field} />;
            }}
            name={`firstName`}
            control={control}
          />
          <PopoverTrigger
            popoverContent={"hello"}
            trigger="hover"
            data-testid="add-button-popover"
          >
            <div>hi</div>
          </PopoverTrigger>
        </>
      );
    }
    return (
      <button
        type="button"
        onClick={() => {
          setShow(true);
        }}
      >
        toggle
      </button>
    );
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <h1>Field Array </h1>
      <p>The following demo allow you to delete, append, prepend items</p>
      {/* <p>is dirty? {isDirty ? "yes" : "no"}</p> */}
      <p>is submit successful? {isSubmitSuccessful ? "yes" : "no"}</p>

      {/* <pre>Dirty Fields: {JSON.stringify(dirtyFields, null, 2)}</pre> */}
      <span className="counter">Render Count: {renderCount}</span>
      {/* <Controller
                render={({ field }) => <input {...field} />}
                name={`firstName`}
                control={control}
            />
            <PopoverTrigger
                popoverContent={"hello"}
                trigger="hover"
                data-testid="add-button-popover"
            >
                <div>hi</div>
            </PopoverTrigger> */}
      {renderContent()}
      <input type="submit" />
      <button
        type="button"
        onClick={() => {
          reset(null);
        }}
      >
        Reset
      </button>
    </form>
  );
};

export default SidePanel;
