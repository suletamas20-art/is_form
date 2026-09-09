/*
     * ==========================================
     * LANGUAGE STRUCTURE
     * ==========================================
     *
     * Currently active language:
     * English
     *
     * Romanian can be added later without
     * changing the form logic.
     */

    const currentLanguage = "en";


    const LANGUAGES = {

        en: {

            pageTitle:
                "Data Collection Form",

            formTitle:
                "Data Collection Form",

            formIntro:
                "Please enter the following information.",

            gradeLabel:
                "1. Grade",

            gradePlaceholder:
                "Select a grade",

            classLabel:
                "2. Class (e.g. 8C, 12B)",

            classPlaceholder:
                "e.g. 8C",

            studentsLabel:
                "3. Number of students",

            submitButton:
                "Submit",

            submittingButton:
                "Submitting...",

            validationRequired:
                "Please complete all fields.",

            successMessage:
                'The data has been submitted successfully. If you would like to submit another form, click the "Submit another" button!',

            errorMessage:
                "An error occurred while submitting the data. Please try again.",

            resendButton:
                "Submit another",

            courseButton:
                "Continue to the course"

        }

        /*
         * Future:
         *
         * ro: {
         *
         *     pageTitle: "...",
         *     formTitle: "...",
         *     ...
         *
         * }
         */

    };


    const TEXTS =
        LANGUAGES[currentLanguage];


    /*
     * ==========================================
     * COURSE URL
     * ==========================================
     */

    const courseUrl =
        "https://link.otpfay.hu/8FtV2L";


    /*
     * ==========================================
     * APPLY LANGUAGE
     * ==========================================
     */

    document.title =
        TEXTS.pageTitle;

    document.documentElement.lang =
        currentLanguage;


    document.getElementById("formTitle").textContent =
        TEXTS.formTitle;

    document.getElementById("formIntro").textContent =
        TEXTS.formIntro;

    document.getElementById("gradeLabel").textContent =
        TEXTS.gradeLabel;

    document.getElementById("gradePlaceholder").textContent =
        TEXTS.gradePlaceholder;

    document.getElementById("classLabel").textContent =
        TEXTS.classLabel;

    document.getElementById("osztaly").placeholder =
        TEXTS.classPlaceholder;

    document.getElementById("studentsLabel").textContent =
        TEXTS.studentsLabel;

    document.getElementById("submitButton").textContent =
        TEXTS.submitButton;

    document.getElementById("resendButton").textContent =
        TEXTS.resendButton;

    document.getElementById("courseButton").textContent =
        TEXTS.courseButton;


    /*
     * ==========================================
     * FORM ELEMENTS
     * ==========================================
     */

    const form =
        document.getElementById("ispringForm");

    const button =
        document.getElementById("submitButton");

    const status =
        document.getElementById("status");

    const postSubmitButtons =
        document.getElementById("postSubmitButtons");

    const resendButton =
        document.getElementById("resendButton");

    const courseButton =
        document.getElementById("courseButton");


    /*
     * ==========================================
     * POWER AUTOMATE HTTP ENDPOINT
     * ==========================================
     */

    const powerAutomateUrl =
        "https://default003fcf5734804f89ac3a530d8d046c.be.environment.api.powerplatform.com:443/powerautomate/automations/direct/cu/14/workflows/1eb125b191aa4229b3ba3fcb9efb0663/triggers/manual/paths/invoke?api-version=1&sp=%2Ftriggers%2Fmanual%2Frun&sv=1.0&sig=eWj-io2uRZCrj7GiArSwHtz7xDU4HA9ZzJvGb0Tpx_Q";


    /*
     * ==========================================
     * FORM SUBMISSION
     * ==========================================
     */

    form.addEventListener(
        "submit",
        async function(event) {

            event.preventDefault();


            /*
             * Get form values
             */

            const evfolyam =
                document.getElementById("evfolyam").value;

            const osztaly =
                document
                    .getElementById("osztaly")
                    .value
                    .trim();

            const diakokSzama =
                document.getElementById("diakokSzama").value;


            /*
             * Required field validation
             */

            if (
                !evfolyam ||
                !osztaly ||
                diakokSzama === ""
            ) {

                status.textContent =
                    TEXTS.validationRequired;

                status.className =
                    "status error";

                return;
            }


            /*
             * Disable submit button
             */

            button.disabled =
                true;

            button.textContent =
                TEXTS.submittingButton;


            /*
             * Data sent to Power Automate
             *
             * IMPORTANT:
             * The data structure remains unchanged.
             */

            const data = {

                evfolyam:
                    evfolyam,

                osztaly:
                    osztaly,

                diakokSzama:
                    Number(diakokSzama),

                timestamp:
                    new Date().toISOString()

            };


            /*
             * Power Automate POST
             */

            try {

                const response =
                    await fetch(
                        powerAutomateUrl,
                        {
                            method: "POST",

                            headers: {
                                "Content-Type":
                                    "application/json"
                            },

                            body:
                                JSON.stringify(data)
                        }
                    );


                /*
                 * HTTP response check
                 */

                if (!response.ok) {

                    throw new Error(
                        "HTTP error: " +
                        response.status
                    );

                }


                /*
                 * Successful submission
                 */

                status.textContent =
                    TEXTS.successMessage;

                status.className =
                    "status success";


                /*
                 * Prevent another accidental
                 * submission of the same data.
                 */

                button.style.display =
                    "none";


                /*
                 * Show both post-submission
                 * buttons only after success.
                 */

                postSubmitButtons.style.display =
                    "flex";


                console.log(
                    "Power Automate response:",
                    response.status
                );


            } catch (error) {

                /*
                 * Error handling
                 */

                console.error(
                    "Power Automate error:",
                    error
                );


                status.textContent =
                    TEXTS.errorMessage;

                status.className =
                    "status error";


                /*
                 * Allow another attempt
                 */

                button.disabled =
                    false;

                button.textContent =
                    TEXTS.submitButton;

            }

        }
    );


    /*
     * ==========================================
     * SUBMIT ANOTHER
     * ==========================================
     *
     * This button appears only after a
     * successful submission.
     *
     * It clears the previous form data and
     * allows the user to create a completely
     * new submission.
     */

    resendButton.addEventListener(
        "click",
        function() {

            /*
             * Reset all form fields
             */

            form.reset();


            /*
             * Clear status message
             */

            status.textContent =
                "";

            status.className =
                "status";


            /*
             * Hide post-submission buttons
             */

            postSubmitButtons.style.display =
                "none";


            /*
             * Show and enable Submit button
             */

            button.style.display =
                "inline-block";

            button.disabled =
                false;

            button.textContent =
                TEXTS.submitButton;


            /*
             * Put focus back on the first field
             */

            document
                .getElementById("evfolyam")
                .focus();

        }
    );


    /*
     * ==========================================
     * CONTINUE TO THE COURSE
     * ==========================================
     */

  /*
 * ==========================================
 * CONTINUE TO THE COURSE
 * ==========================================
 */

courseButton.addEventListener(
    "click",
    function() {

        window.top.location.href =
            courseUrl;

    }
);
