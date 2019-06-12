import {Component, Input, OnInit} from '@angular/core';
import {FormControl, FormGroup, Validators} from '@angular/forms';

@Component({
    selector: 'app-input-drop-down',
    templateUrl: './inputDropdown.component.html',
    styleUrls: ['./inputDropdown.component.scss']
})
export class InputDropdownComponent implements OnInit {

    @Input()
    dataList: any[];

    @Input()
    columnName: string;

    @Input()
    placeholder: string;

    @Input()
    inputDropDownFormGroup: FormGroup;

    @Input()
    inputDropDownFormControlName: string;

    @Input()
    isSubmitted: boolean;

    @Input()
    errorText: string;

    dummyDataList: any[];
    showDropDown: boolean;
    counter: number;

    constructor() {
    }

    ngOnInit() {
        if (this.inputDropDownFormGroup !== undefined) {
            this.inputDropDownFormGroup.addControl(this.inputDropDownFormControlName, new FormControl('', Validators.required));
        }
    }

    // convenience getter for easy access to form fields
    get f() {
        return this.inputDropDownFormGroup.controls;
    }

    onFocusEventAction(): void {
        this.reset();
        this.counter = -1;
        this.showDropDown = true;
    }

    onBlurEventAction(): void {
        this.showDropDown = false;
    }

    onKeyDownAction(event: KeyboardEvent): void {
        this.showDropDown = true;

        if (event.keyCode === 38) {
            this.counter = (this.counter === 0) ? this.counter : --this.counter;
            this.checkHighlight(this.counter);
            this.inputDropDownFormControlName = this.dataList[this.counter][this.columnName];
        }

        if (event.keyCode === 40) {
            this.counter = (this.counter === this.dataList.length - 1) ? this.counter : ++this.counter;
            this.checkHighlight(this.counter);
            this.inputDropDownFormGroup.controls[this.inputDropDownFormControlName].setValue(this.dataList[this.counter][this.columnName]);
        }
    }

    checkHighlight(currentItem): boolean {
        return this.counter === currentItem;
    }

    reset(): void {
        this.showDropDown = false;
        this.dummyDataList = this.dataList;
    }

    textChange(value) {
        this.dummyDataList = [];
        if (value !== undefined && value.length > 0) {
            this.dummyDataList = this.transform(this.dataList, this.columnName, value);

            if (this.dummyDataList) {
                this.showDropDown = true;
            }
        } else {
            this.reset();
        }
    }

    updateTextBox(valueSelected) {
        this.inputDropDownFormGroup.controls[this.inputDropDownFormControlName].setValue(valueSelected);
        this.showDropDown = false;
    }

    transform(dataToSort: string[], columnNameToSort: string, stringToSort: string): any[] {
        const sortedData: string[] = [];

        for (let i = 0; i < dataToSort.length; ++i) {
            if (dataToSort[i][columnNameToSort].search(stringToSort) > -1) {
                sortedData.push(dataToSort[i]);
            }
        }

        return sortedData;
    }
}
