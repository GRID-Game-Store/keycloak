// ejected using 'npx eject-keycloak-page'
import { useState } from "react";
import { clsx } from "keycloakify/tools/clsx";
import { UserProfileFormFields } from "./shared/UserProfileFormFields";
import type { PageProps } from "keycloakify/login/pages/PageProps";
import { useGetClassName } from "keycloakify/login/lib/useGetClassName";
import type { KcContext } from "../kcContext";
import type { I18n } from "../i18n";
import { Button } from "../../components/ui/button";

export default function RegisterUserProfile(
  props: PageProps<
    Extract<KcContext, { pageId: "register-user-profile.ftl" }>,
    I18n
  >
) {
  const { kcContext, i18n, doUseDefaultCss, Template, classes } = props;

  const { getClassName } = useGetClassName({
    doUseDefaultCss,
    classes,
  });

  const { url, messagesPerField, recaptchaRequired, recaptchaSiteKey } =
    kcContext;

  const { msg, msgStr } = i18n;

  const [isFormSubmittable, setIsFormSubmittable] = useState(false);

  return (
    <Template
      {...{ kcContext, i18n, doUseDefaultCss, classes }}
      displayMessage={messagesPerField.exists("global")}
      displayRequiredFields={true}
      headerNode={msg("registerTitle")}
    >
      <form
        id="kc-register-form"
        className={getClassName("kcFormClass")}
        action={url.registrationAction}
        method="post"
      >
        <UserProfileFormFields
          kcContext={kcContext}
          onIsFormSubmittableValueChange={setIsFormSubmittable}
          i18n={i18n}
          getClassName={getClassName}
        />
        {recaptchaRequired && (
          <div className="form-group">
            <div className={getClassName("kcInputWrapperClass")}>
              <div
                className="g-recaptcha"
                data-size="compact"
                data-sitekey={recaptchaSiteKey}
              />
            </div>
          </div>
        )}
        <div
          className={getClassName("kcFormGroupClass")}
          style={{ marginBottom: 30 }}
        >
          <div
            id="kc-form-options"
            className={getClassName("kcFormOptionsClass")}
          >
            <p className="px-8 text-center text-sm text-muted-foreground pt-2 pb-2">
              <a
                href={url.loginUrl}
                className="hover:text-brand underline underline-offset-4"
              >
                {msg("backToLogin")}
              </a>
            </p>
          </div>

          <div
            id="kc-form-buttons"
            className={getClassName("kcFormButtonsClass")}
          >

            <Button tabIndex={4} type="submit" style={{ width: "100%" }}>
              {msgStr("doRegister")}
            </Button>
          </div>
        </div>
      </form>
    </Template>
  );
}
