// lib/validateForm.js
// Pure validation function: takes the form state, returns an errors
// object keyed the same way the sections read their own errors.

const EMAIL_PATTERN = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
const MOBILE_PATTERN = /^[6-9]\d{9}$/; // 10-digit Indian mobile number

export function validateForm(formState) {
  const errors = {
    studentDetails: {},
    ideaDetails: {},
    declaration: {},
  };

  const { studentDetails, ideaDetails, declaration } = formState;

  if (!studentDetails.studentName.trim()) {
    errors.studentDetails.studentName = "Student name is required.";
  }
  if (!studentDetails.registerNumber.trim()) {
    errors.studentDetails.registerNumber = "Register number is required.";
  }
  if (!studentDetails.department.trim()) {
    errors.studentDetails.department = "Department is required.";
  }
  if (!studentDetails.programme.trim()) {
    errors.studentDetails.programme = "Programme / course is required.";
  }
  if (!studentDetails.email.trim()) {
    errors.studentDetails.email = "Email is required.";
  } else if (!EMAIL_PATTERN.test(studentDetails.email.trim())) {
    errors.studentDetails.email = "Enter a valid email address.";
  }
  if (!studentDetails.mobileNumber.trim()) {
    errors.studentDetails.mobileNumber = "Mobile number is required.";
  } else if (!MOBILE_PATTERN.test(studentDetails.mobileNumber.trim())) {
    errors.studentDetails.mobileNumber =
      "Enter a valid 10-digit mobile number.";
  }

  if (!ideaDetails.title.trim()) {
    errors.ideaDetails.title = "Idea / startup title is required.";
  }
  if (!ideaDetails.problemAddressed.trim()) {
    errors.ideaDetails.problemAddressed = "Problem statement is required.";
  }
  if (!ideaDetails.proposedSolution.trim()) {
    errors.ideaDetails.proposedSolution = "Proposed solution is required.";
  }

  if (!declaration.agreed) {
    errors.declaration.agreed = "You must accept the declaration to submit.";
  }

  const flatten = (obj) =>
    Object.values(obj).reduce((count, v) => count + Object.keys(v).length, 0);

  return { errors, isValid: flatten(errors) === 0 };
}
