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
import { FaceIcon, ImageIcon, SunIcon } from "@radix-ui/react-icons";
import { GetIcon } from "../../components/ui/icon";
const my_custom_param = new URL(window.location.href).searchParams.get(
    "my_custom_param"
  );
  if (my_custom_param !== null) {
    console.log("my_custom_param:", my_custom_param);
  }
  


export default function LoginResetPassword(props: PageProps<Extract<KcContext, { pageId: "login.ftl" }>, I18n>){
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
      return <Template
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
        <div>   </div>
    </Template>

    
}