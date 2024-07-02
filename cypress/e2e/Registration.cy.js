const data_test = require(`../fixtures/regtest/registration.json`)


describe("Registration", () => {
  it("Verify_CalculateAge_DateofBirth_DOBUnknow_DataPostcode", () => {
    cy.funcLoginCentrix("automated.nurse.psuv", "abc@123").wait(3000);  //ยกออกไปไว้ที่ beforeEach
    cy.get('.mar-pad-toolbar').should('contain.text', "automated.nurse.psuv");
    cy.get('.toolbar-title').should('have.text', "OPD Worklist").wait(3000);
    cy.funcSwitchRole("Registration", "Medicine Clinic");
    cy.get('.toolbar-title').should('have.text', "OPD Worklist").wait(3000);
    cy.funcSelectMenu("Registration", "OP Registration");
    cy.funcSearchPatientOPRegister("54-24-000082");
    cy.funcViewModifyDemographics("54-24-000082");
    cy.cfuncDOBtoAge("05-01-1994");
    cy.get("@cfuncDOBtoAge").then((DOBtoAge) => {
      cy.log(DOBtoAge);
      cy.get(".ng-binding").should('contain.text', DOBtoAge);
    });
    cy.funcEnableDOBUnknown("30");
    cy.get("@cfuncAgetoDOB").then((AgetoDOB) => {
      cy.log(AgetoDOB);
      cy.get("#inputElementId3").should("contain.value", AgetoDOB);
    });
    cy.funcChangePostCode("10210");
  });

  it("Verify_LastEncounter_AssignCareprovider_AddPayorRank1_StatusVisit", () => {
    cy.funcLoginCentrix("automated.nurse.psuv", "abc@123").wait(3000);  //ยกออกไปไว้ที่ beforeEach
    cy.get('.mar-pad-toolbar').should('contain.text', "automated.nurse.psuv");
    cy.get('.toolbar-title').should('have.text', "OPD Worklist").wait(3000);
    cy.funcSelectMenu("Registration", "OP Registration");
    cy.funcSearchPatientOPRegister("54-24-000083");
    cy.get('[ng-click="vm.selectPatient(patient)"]').click().wait(3000);
    cy.get('.md-cell').should('contain.text', "Outpatient");
    cy.get('[ng-click="vm.checkNextStep(vm.selectedpatient)"]').click().wait(3000);
    cy.funcCheckVisitandResgisterPatient("54-24-000083").wait(3000);
    cy.funcSwitchRole("Registration", "Medicine Clinic");
    cy.get('.toolbar-title').should('have.text', "OPD Worklist").wait(3000);
    cy.funcAddPayorPatientDemograph("54-24-000083", "TEST001", "test001", "test001" );
    cy.funcDelPayorPatientDemograph("54-24-000083");
    cy.funcAssignCareporviderVisitDetail("automated.doctor.psuv");
    cy.funcChageAllStautsPatientVisitDetail();
    cy.funcCloseVisitPatientInquiry("54-24-000083").wait(3000); // ยกไปไว้ที่ afterEach
  })

  it("Verify_MassCasualty_Whiteboard", () => {
    cy.funcLoginCentrix("automated.nurse.psuv", "abc@123").wait(3000);  //ยกออกไปไว้ที่ beforeEach
    cy.get('.mar-pad-toolbar').should('contain.text', "automated.nurse.psuv");
    cy.funcSwitchRole("Registration", "Medicine Clinic");
    cy.get('.toolbar-title').should('have.text', "OPD Worklist").wait(3000);
    cy.funcSelectMenu("Emergency", "Mass Casualty"); 
    const numOfpatient = {adultmale: "1", adultfemale: "1", adultunknown: "1", childmale: "1", childfemale: "1", childunknown: "1" }
    cy.functionRegisterPatientMassCasualty("รถชน", numOfpatient, "Visit successfully created for  6 Patient"); 
    data_test['patientInfo']
    cy.verifyRegisterPateintWardBoard(data_test['patientInfo']) 
    const hns = [];
    cy.get('.md-body > :nth-child(n) > :nth-child(3)').each(($el, index) => {
      cy.wrap($el).invoke('text').then(hn => {
        cy.log(`HN ${index + 1}: ${hn}`);
        hns.push(hn);
        cy.wrap(hn).as(`HN${index + 1}`);
      })
    }).then(() => {
          // Ensure all HNs are fetched before proceeding
            expect(hns).to.have.length(6);
          // Loop through the collected HNs and close visits
          hns.forEach(hn => {
          cy.funcCloseVisitPatientInquiry(hn).wait(3000);
          cy.funcSelectMenu("Emergency", "Whiteboard");
        });
    });
  })

  it.only("Verify_CannotBulkRegisWith_NationalidExsiting", () => {
    cy.log("Test kaaaa")
  })
});



  // to improve next 
  // 1.set base url, 
  // 2.set beforeEach, afterEach
  // 3. ทำ data test แล้วเรียกใช้ในแต่ละ testcase

