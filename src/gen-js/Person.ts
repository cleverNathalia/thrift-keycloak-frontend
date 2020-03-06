/* tslint:disable */
/* eslint-disable */
/*
 * Autogenerated by @creditkarma/thrift-typescript v3.7.6
 * DO NOT EDIT UNLESS YOU ARE SURE THAT YOU KNOW WHAT YOU ARE DOING
*/
import * as thrift from "thrift";
export interface IPersonArgs {
    id?: string;
    name?: string;
    address?: string;
    phone?: string;
}
export class Person {
    public id?: string;
    public name?: string;
    public address?: string;
    public phone?: string;
    constructor(args?: IPersonArgs) {
        if (args != null && args.id != null) {
            this.id = args.id;
        }
        if (args != null && args.name != null) {
            this.name = args.name;
        }
        if (args != null && args.address != null) {
            this.address = args.address;
        }
        if (args != null && args.phone != null) {
            this.phone = args.phone;
        }
    }
    public write(output: thrift.TProtocol): void {
        output.writeStructBegin("Person");
        if (this.id != null) {
            output.writeFieldBegin("id", thrift.Thrift.Type.STRING, 1);
            output.writeString(this.id);
            output.writeFieldEnd();
        }
        if (this.name != null) {
            output.writeFieldBegin("name", thrift.Thrift.Type.STRING, 2);
            output.writeString(this.name);
            output.writeFieldEnd();
        }
        if (this.address != null) {
            output.writeFieldBegin("address", thrift.Thrift.Type.STRING, 3);
            output.writeString(this.address);
            output.writeFieldEnd();
        }
        if (this.phone != null) {
            output.writeFieldBegin("phone", thrift.Thrift.Type.STRING, 4);
            output.writeString(this.phone);
            output.writeFieldEnd();
        }
        output.writeFieldStop();
        output.writeStructEnd();
        return;
    }
    public static read(input: thrift.TProtocol): Person {
        input.readStructBegin();
        let _args: any = {};
        while (true) {
            const ret: thrift.TField = input.readFieldBegin();
            const fieldType: thrift.Thrift.Type = ret.ftype;
            const fieldId: number = ret.fid;
            if (fieldType === thrift.Thrift.Type.STOP) {
                break;
            }
            switch (fieldId) {
                case 1:
                    if (fieldType === thrift.Thrift.Type.STRING) {
                        const value_1: string = input.readString();
                        _args.id = value_1;
                    }
                    else {
                        input.skip(fieldType);
                    }
                    break;
                case 2:
                    if (fieldType === thrift.Thrift.Type.STRING) {
                        const value_2: string = input.readString();
                        _args.name = value_2;
                    }
                    else {
                        input.skip(fieldType);
                    }
                    break;
                case 3:
                    if (fieldType === thrift.Thrift.Type.STRING) {
                        const value_3: string = input.readString();
                        _args.address = value_3;
                    }
                    else {
                        input.skip(fieldType);
                    }
                    break;
                case 4:
                    if (fieldType === thrift.Thrift.Type.STRING) {
                        const value_4: string = input.readString();
                        _args.phone = value_4;
                    }
                    else {
                        input.skip(fieldType);
                    }
                    break;
                default: {
                    input.skip(fieldType);
                }
            }
            input.readFieldEnd();
        }
        input.readStructEnd();
        return new Person(_args);
    }
}