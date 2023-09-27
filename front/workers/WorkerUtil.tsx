import {Employee} from "./WorkerPage.tsx";

export function getEmployeeFromForm(): Employee {
    const name = (document.getElementById("name") as HTMLInputElement).value;
    const surname = (document.getElementById("surname") as HTMLInputElement).value;
    const age = parseInt((document.getElementById("age") as HTMLInputElement).value);
    const departmentId = parseInt((document.getElementById("department") as HTMLSelectElement).value);
    const gender = (document.getElementById("gender") as HTMLSelectElement).value;
    const bgImage = (document.getElementById("photo") as HTMLInputElement).style.backgroundImage;
    const photo = (bgImage === "url(\"/assets/EmptyPfp.svg\")" ? null : bgImage.replace("url(\"", "").replace("\")", ""));
    const id = parseInt((document.getElementById("id") as HTMLInputElement).value);
    const languageName = (document.getElementById("language") as HTMLSelectElement).value;

    return new Employee(id, name, surname, age, gender, departmentId, photo, languageName);
}

export function resetForm(employee: Employee) {
    const name = document.getElementById("name") as HTMLInputElement;
    const surname = document.getElementById("surname") as HTMLInputElement;
    const age = document.getElementById("age") as HTMLInputElement;
    const department = document.getElementById("department") as HTMLSelectElement;
    const language = document.getElementById("language") as HTMLSelectElement;
    const gender = document.getElementById("gender") as HTMLSelectElement;
    const photoInput = document.getElementById("photoInput") as HTMLInputElement;
    const photo = document.getElementById("photo");
    if (photo && photoInput && name && surname && age && department && language && gender) {
        name.value = employee.name;
        surname.value = employee.surname;
        age.value = employee.age.toString();
        department.value = employee.departmentId.toString();
        language.value = employee.programmingLanguageName;
        gender.value = employee.gender;
        const dataTransfer = new DataTransfer();
        if (employee.photo) {
            dataTransfer.items.add(new File([employee.photo], "photo", {type: "image/jpg"}));
        }
        photoInput.files = dataTransfer.files;
        photo.style.backgroundImage = employee.photo ? "url(\"" + employee.photo + "\")" : "url(\"/assets/EmptyPfp.svg\")";
    }
}