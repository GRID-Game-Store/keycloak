// Copy pasted from: https://github.com/InseeFrLab/keycloakify/blob/main/src/login/Template.tsx

import { useState } from "react";
import { assert } from "keycloakify/tools/assert";
import { clsx } from "keycloakify/tools/clsx";
import { usePrepareTemplate } from "keycloakify/lib/usePrepareTemplate";
import { type TemplateProps } from "keycloakify/login/TemplateProps";
import { useGetClassName } from "keycloakify/login/lib/useGetClassName";
import type { KcContext } from "./kcContext";
import type { I18n } from "./i18n";
import keycloakifyLogoPngUrl from "./assets/keycloakify-logo.png";
import { PUBLIC_URL } from "../../PUBLIC_URL";
import { Button, buttonVariants } from "../components/ui/button";
import { cn } from "../lib/utils";
export default function Template(props: TemplateProps<KcContext, I18n>) {
  const {
    displayInfo = false,
    displayMessage = true,
    displayRequiredFields = false,
    displayWide = false,
    showAnotherWayIfPresent = true,
    headerNode,
    showUsernameNode = null,
    infoNode = null,
    kcContext,
    i18n,
    doUseDefaultCss,
    classes,
    children,
  } = props;

  const { getClassName } = useGetClassName({ doUseDefaultCss, classes });

  const { msg, changeLocale, labelBySupportedLanguageTag, currentLanguageTag } =
    i18n;

  const { realm, locale, auth, url, message, isAppInitiatedAction } = kcContext;

  useState(() => {
    document.title = i18n.msgStr("loginTitle", kcContext.realm.displayName);
  });

  return (
    <div className="container flex h-screen w-screen flex-col items-center justify-center">
      <a
        href="/"
        className={cn(
          buttonVariants({ variant: "ghost" }),
          "absolute left-4 top-4 md:left-8 md:top-8"
        )}
      >
        <>Back</>
      </a>
      <div className="mx-auto flex w-full flex-col justify-center space-y-6 sm:w-[350px]">
        <div className="flex flex-col space-y-2 text-center">
          {!(
            auth !== undefined &&
            auth.showUsername &&
            !auth.showResetCredentials
          ) ? (
            displayRequiredFields ? (
              <div className={getClassName("kcContentWrapperClass")}>
                <div
                  className={clsx(
                    getClassName("kcLabelWrapperClass"),
                    "subtitle"
                  )}
                >
                  <span className="subtitle">
                    <span className="required">*</span>
                    {msg("requiredFields")}
                  </span>
                </div>
                <div className="col-md-10">
                  <h1 className="text-2xl font-semibold tracking-tight">
                    {headerNode}
                  </h1>
                </div>
              </div>
            ) : (
                <h1 className="text-2xl font-semibold tracking-tight">
                    {headerNode}
                </h1>
            )
          ) : displayRequiredFields ? (
            <div className={getClassName("kcContentWrapperClass")}>
              <div
                className={clsx(
                  getClassName("kcLabelWrapperClass"),
                  "subtitle"
                )}
              >
                <span className="subtitle">
                  <span className="required">*</span> {msg("requiredFields")}
                </span>
              </div>
              <div className="col-md-10">
              
                {showUsernameNode}
                <div className={getClassName("kcFormGroupClass")}>
                  <div id="kc-username">
                    <label id="kc-attempted-username">
                      {auth?.attemptedUsername}
                    </label>
                    <a id="reset-login" href={url.loginRestartFlowUrl}>
                      <div className="kc-login-tooltip">
                        <i className={getClassName("kcResetFlowIcon")}></i>
                        <span className="kc-tooltip-text">
                          {msg("restartLoginTooltip")}
                        </span>
                      </div>
                    </a>
                  </div>
                </div>
              </div>
            </div>
          ) : (
            <>
              {showUsernameNode}
              <div className={getClassName("kcFormGroupClass")}>
                <div id="kc-username">
                  <label id="kc-attempted-username">
                    {auth?.attemptedUsername}
                  </label>
                  <a id="reset-login" href={url.loginRestartFlowUrl}>
                    <div className="kc-login-tooltip">
                      <i className={getClassName("kcResetFlowIcon")}></i>
                      <span className="kc-tooltip-text">
                        {msg("restartLoginTooltip")}
                      </span>
                    </div>
                  </a>
                </div>
              </div>
            </>
          )}
        </div>
        <div className={cn("grid gap-6")}>
          {children}
          {auth !== undefined &&
            auth.showTryAnotherWayLink &&
            showAnotherWayIfPresent && (
              <form
                id="kc-select-try-another-way-form"
                action={url.loginAction}
                method="post"
              >
                <div
                  className={clsx(
                    displayWide && [
                      getClassName("kcFormSocialAccountContentClass"),
                      getClassName("kcFormSocialAccountClass"),
                    ]
                  )}
                ></div>
              </form>
            )}
        </div>
      </div>
    </div>
  );
}
