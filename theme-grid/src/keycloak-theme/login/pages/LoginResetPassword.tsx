import { clsx } from "keycloakify/tools/clsx";
import type { PageProps } from "keycloakify/login/pages/PageProps";
import { useGetClassName } from "keycloakify/login/lib/useGetClassName";
import type { KcContext } from "../kcContext";
import type { I18n } from "../i18n";
import { Label } from "../../components/ui/label";
import { Input } from "../../components/ui/input";
import { Button } from "../../components/ui/button";

export default function LoginResetPassword(
  props: PageProps<
    Extract<KcContext, { pageId: "login-reset-password.ftl" }>,
    I18n
  >
) {
  const { kcContext, i18n, doUseDefaultCss, Template, classes } = props;

  const { getClassName } = useGetClassName({
    doUseDefaultCss,
    classes,
  });

  const { url, realm, auth } = kcContext;

  const { msg, msgStr } = i18n;

  return (
    <Template
      {...{ kcContext, i18n, doUseDefaultCss, classes }}
      displayMessage={false}
      headerNode={msg("emailForgotTitle")}
      infoNode={msg("emailInstruction")}
    >
      <form
        id="kc-reset-password-form"
        className={getClassName("kcFormClass")}
        action={url.loginAction}
        method="post"
      >
        <div className={getClassName("kcFormGroupClass")}>
          <Label htmlFor={"username"}>
            {!realm.loginWithEmailAllowed
              ? msg("username")
              : !realm.registrationEmailAsUsername
              ? msg("usernameOrEmail")
              : msg("email")}
          </Label>
          <Input
            tabIndex={1}
            type="text"
            id="username"
            name="username"
            autoFocus
            defaultValue={
              auth !== undefined && auth.showUsername
                ? auth.attemptedUsername
                : undefined
            }
          />
        </div>

        <div
          className={clsx(
            getClassName("kcFormGroupClass"),
            getClassName("kcFormSettingClass")
          )}
        >
          <div
            id="kc-form-options"
            className={getClassName("kcFormOptionsClass")}
          >
            <div className={getClassName("kcFormOptionsWrapperClass")}>
              <p className="px-8 text-center text-sm text-muted-foreground pt-2 pb-2">
                <a
                  href={url.loginUrl}
                  className="hover:text-brand underline underline-offset-4"
                >
                  {msg("backToLogin")}
                </a>
              </p>
            </div>
          </div>

          <div
            id="kc-form-buttons"
            className={getClassName("kcFormButtonsClass")}
          >
            <Button tabIndex={4} type="submit" style={{ width: "100%" }}>
              {msgStr("doSubmit")}
            </Button>
          </div>
        </div>
      </form>
    </Template>
  );
}
