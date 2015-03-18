#form-Bundle
    - send success (Event on Submit)
        formname* // formname* - Send success // Form: formname* send success*
    - send failed: (Event on method Call {sendFailed($form)})
        formname* // formname* - Send failed // Form: formname* send failed*

    - Newsletter
        - signup (Event on Submit || Event on method Call {newsletter.signup(name, callback)})
            Newsletter // Newsletter - Sign-Up // Newsletter: name* sign-up success

        - signup-failed (Event on method Call {newsletter.signupFailed(name, callback)})
            Newsletter // Newsletter - Sign-Up failed // Newsletter: name* sign-up failed

        - signoff (Event on method Call {newsletter.signoff(name, callback)})
            Newsletter // Newsletter - Sign-Off // Newsletter: name* sign-off