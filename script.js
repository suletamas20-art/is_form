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

            municipalityLabel:
                "2. Municipality",

            municipalityPlaceholder:
                "Start typing a municipality...",

            schoolLabel:
                "3. School / Educational institution",

            schoolPlaceholder:
    "Enter school or educational institution...",

institutionTypeLabel:
    "4. Institution type",

institutionTypeOtherPlaceholder:
    "Enter institution type...",

classLabel:
    "5. Class (e.g. 8C, 12B)",

            classPlaceholder:
                "e.g. 8C",

            studentsLabel:
                "6. Number of students",

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

    document.getElementById("municipalityLabel").textContent =
        TEXTS.municipalityLabel;

    document.getElementById("telepules").placeholder =
        TEXTS.municipalityPlaceholder;

    document.getElementById("schoolLabel").textContent =
        TEXTS.schoolLabel;
        
    document.getElementById("iskola").placeholder =
    TEXTS.schoolPlaceholder;

    document.getElementById("institutionTypeLabel").textContent =
    TEXTS.institutionTypeLabel;

document.getElementById("institutionTypeOtherText").placeholder =
    TEXTS.institutionTypeOtherPlaceholder;

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
     * MUNICIPALITY AUTOCOMPLETE
     * ==========================================
     */

    const municipalityInput =
        document.getElementById("telepules");

    const municipalityResults =
        document.getElementById("telepulesResults");

    const telepulesekRendezve =
    [...moldovaTelepulesek].sort(function (a, b) {

        const latinA =
            a.split(" / ")[0];

        const latinB =
            b.split(" / ")[0];

        return latinA.localeCompare(
            latinB,
            "ro",
            {
                sensitivity: "base"
            }
        );

    });

    municipalityInput.addEventListener("input", function () {

        const query =
            municipalityInput.value.trim().toLocaleLowerCase();

        municipalityResults.innerHTML = "";

        if (!query) {
            return;
        }

      const matches =
    telepulesekRendezve
        .filter(function (municipality) {

            const latinName =
                municipality.split(" / ")[0];

            return latinName
                .toLocaleLowerCase()
                .startsWith(query);

        })

        if (matches.length === 0) {

            const empty =
                document.createElement("div");

            empty.className =
                "autocomplete-empty";

            empty.textContent =
                "No matching municipality found.";

            municipalityResults.appendChild(empty);

            return;
        }

        matches.forEach(function (municipality) {

            const item =
                document.createElement("div");

            item.className =
                "autocomplete-item";

            item.textContent =
                municipality;

            item.addEventListener("click", function () {

                municipalityInput.value =
                    municipality;

                municipalityResults.innerHTML = "";

            });

            municipalityResults.appendChild(item);

        });

    });

    document.addEventListener("click", function (event) {

        if (!event.target.closest(".autocomplete")) {
            municipalityResults.innerHTML = "";
        }

    });


        /*
     * ==========================================
     * INSTITUTION TYPE
     * ==========================================
     */

    const institutionTypeCheckboxes =
        document.querySelectorAll(
            'input[name="institutionType"]'
        );

    const institutionTypeOther =
        document.getElementById("institutionTypeOther");

    const institutionTypeOtherText =
        document.getElementById("institutionTypeOtherText");


    institutionTypeCheckboxes.forEach(function (checkbox) {

        checkbox.addEventListener("change", function () {

            /*
             * Only one institution type
             * can be selected.
             */

            if (checkbox.checked) {

                institutionTypeCheckboxes.forEach(
                    function (otherCheckbox) {

                        if (otherCheckbox !== checkbox) {
                            otherCheckbox.checked = false;
                        }

                    }
                );

            }


            /*
             * Show custom text field
             * only when Other is selected.
             */

            if (
                institutionTypeOther.checked
            ) {

                institutionTypeOtherText.style.display =
                    "block";

                institutionTypeOtherText.required =
                    true;

            } else {

                institutionTypeOtherText.style.display =
                    "none";

                institutionTypeOtherText.required =
                    false;

                institutionTypeOtherText.value =
                    "";

            }

        });

    });


    /*
     * ==========================================
     * FORM ELEMENTS
     * ==========================================
     */

    const form =
        document.getElementById("ispringForm");
    
    const button =
    document.getElementById("submitButton");
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
            const telepules =
    document
        .getElementById("telepules")
        .value
        .trim();

            const iskola =
    document
        .getElementById("iskola")
        .value
        .trim();

    const selectedInstitutionType =
    document.querySelector(
        'input[name="institutionType"]:checked'
    );

let intezmenyTipusa = "";

if (selectedInstitutionType) {

    if (
        selectedInstitutionType.value === "Other"
    ) {

        intezmenyTipusa =
            institutionTypeOtherText.value.trim();

    } else {

        intezmenyTipusa =
            selectedInstitutionType.value;

    }

}


            /*
             * Required field validation
             */

            if (
    !evfolyam ||
    !telepules ||
    !iskola ||
    !intezmenyTipusa ||
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

    telepules:
        telepules,

    iskola:
        iskola,
    
    intezmenyTipusa:
        intezmenyTipusa,

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
