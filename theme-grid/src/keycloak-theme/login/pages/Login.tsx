import { useState, type FormEventHandler } from "react";
import { clsx } from "keycloakify/tools/clsx";
import { useConstCallback } from "keycloakify/tools/useConstCallback";
import type { PageProps } from "keycloakify/login/pages/PageProps";
import { useGetClassName } from "keycloakify/login/lib/useGetClassName";
import type { KcContext } from "../kcContext";
import type { I18n } from "../i18n";
import { Label } from "../../components/ui/label";
import { Input } from "../../components/ui/input";
import { Checkbox } from "../../components/ui/checkbox";
import { Button } from "../../components/ui/button";
import { Alert, AlertDescription, AlertTitle } from "../../components/ui/alert";
import { GetIcon } from "../../components/ui/icon";

const my_custom_param = new URL(window.location.href).searchParams.get(
  "my_custom_param"
);

if (my_custom_param !== null) {
  console.log("my_custom_param:", my_custom_param);
}

export default function Login(
  props: PageProps<Extract<KcContext, { pageId: "login.ftl" }>, I18n>
) {
  const { kcContext, i18n, doUseDefaultCss, Template, classes } = props;

  const {
    social,
    realm,
    url,
    usernameHidden,
    login,
    auth,
    registrationDisabled,
  } = kcContext;

  const { msg, msgStr } = i18n;

  const [isLoginButtonDisabled, setIsLoginButtonDisabled] = useState(false);

  const onSubmit = useConstCallback<FormEventHandler<HTMLFormElement>>((e) => {
    e.preventDefault();

    setIsLoginButtonDisabled(true);

    const formElement = e.target as HTMLFormElement;

    //NOTE: Even if we login with email Keycloak expect username and password in
    //the POST request.
    formElement
      .querySelector("input[name='email']")
      ?.setAttribute("name", "username");

    formElement.submit();
  });

  const UserName = () => {
    const label = !realm.loginWithEmailAllowed
      ? "username"
      : realm.registrationEmailAsUsername
      ? "email"
      : "usernameOrEmail";

    const autoCompleteHelper: typeof label =
      label === "usernameOrEmail" ? "username" : label;

    return (
      <>
        <Label htmlFor={autoCompleteHelper}>{msg(label)}</Label>
        <Input
          tabIndex={1}
          id={autoCompleteHelper}
          name={autoCompleteHelper}
          defaultValue={login.username ?? ""}
          type="text"
          autoFocus={true}
          autoComplete="off"
        />
      </>
    );
  };
  const Password = () => {
    return (
      <div>
        <Label htmlFor={"password"}>{msg("password")}</Label>
        <Input
          tabIndex={2}
          id="password"
          name="password"
          type="password"
          autoComplete="off"
        />
      </div>
    );
  };
  const OAuth = () => {
    return (
      <div id="kc-social-providers">
        <div className="relative pt-3">
          <div className="absolute inset-0 flex items-center">
            <span className="w-full border-t" />
          </div>
          <div className="relative flex justify-center text-xs uppercase">
            <span className="bg-background px-2 text-muted-foreground">
              Or continue with
            </span>
          </div>
        </div>
        <ul>
          {realm.password &&
            social.providers &&
            social.providers.splice(0, 1).map((p) => (
              <li key={p.providerId} className={"flex flex-row w-100 mt-2"}>
                <Button
                  style={{ width: "100%" }}
                  className="flex flex-row justify-center mb-2"
                  variant={"outline"}
                  asChild
                >
                  <a href={p.loginUrl} id={`zocial-${p.alias}`}>
                    <GetIcon
                      iconName={p.displayName.toLowerCase()}
                      props={{}}
                    />
                    <span className="pl-1">{p.displayName}</span>
                  </a>
                </Button>
              </li>
            ))}
        </ul>
      </div>
    );
  };
  const ForgotPassword = () => {
    return (
      <p className="px-8 text-center text-sm text-muted-foreground ">
        <a
          href={url.loginResetCredentialsUrl}
          className="hover:text-brand underline underline-offset-4"
        >
          {msg("doForgotPassword")}
        </a>
      </p>
    );
  };
  const RememberMe = () => {
    return (
      <div className="flex items-center space-x-2 p-2">
        <Checkbox id="rememberMe" />
        <Label
          id="rememberMe"
          htmlFor={"password"}
          {...(login.rememberMe === "on"
            ? {
                checked: true,
              }
            : {})}
        >
          {msg("rememberMe")}
        </Label>
      </div>
    );
  };

  const ButtonLogin = () => {
    return (
      <div id="kc-form-buttons">
        <input
          type="hidden"
          id="id-hidden-input"
          name="credentialId"
          {...(auth?.selectedCredential !== undefined
            ? {
                value: auth.selectedCredential,
              }
            : {})}
        />
        <div className="flex justify-center w-59px mt-2">
          <Button
            tabIndex={4}
            name="login"
            id="kc-login"
            type="submit"
            style={{ width: "100%" }}
            disabled={isLoginButtonDisabled}
          >
            {msgStr("doLogIn")}
          </Button>
        </div>
      </div>
    );
  };

  return (
    <Template
      {...{ kcContext, i18n, doUseDefaultCss, classes }}
      displayInfo={social.displayInfo}
      displayWide={realm.password && social.providers !== undefined}
      headerNode={msg("doLogIn")}
      infoNode={
        realm.password &&
        realm.registrationAllowed &&
        !registrationDisabled && (
          <div id="kc-registration">
            <span>
              {msg("noAccount")}
              <a tabIndex={6} href={url.registrationUrl}>
                {msg("doRegister")}
              </a>
            </span>
          </div>
        )
      }
    >
      <div id="kc-form">
        <div id="kc-form-wrapper">
          {realm.password && (
            <form
              id="kc-form-login"
              onSubmit={onSubmit}
              action={url.loginAction}
              method="post"
            >
              <div>{!usernameHidden && <UserName />}</div>
              <Password />
              <div>
                <div id="kc-form-options">
                  {realm.rememberMe && !usernameHidden && <RememberMe />}
                </div>
                <div className={"pm-2"}>
                  {realm.resetPasswordAllowed && <ForgotPassword />}
                </div>
              </div>
              <ButtonLogin />
            </form>
          )}
          {realm.password && social.providers !== undefined && <OAuth />}
          
        </div>
      </div>
    </Template>
  );
}
