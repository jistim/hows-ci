import React from "react";
import jQuery from "jquery";

import HowsAPI from "app/api/hows-api";


class FileList extends React.Component {
    //
    constructor(props) {
        //
        super(props);
        this.state = {
            fileList: null
        };
        this.setInitialState = this.setInitialState.bind(this);
        this.removeFile = this.removeFile.bind(this);
        this.deployFile = this.deployFile.bind(this);
    }
    // overriding
    componentWillMount() {
        //
        this.setInitialState();
    }
    setInitialState() {
        //
        HowsAPI.findFiles()
            .then((fileList) => {
                this.setState({
                    fileList: fileList
                });
            });
    }
    uploadFile() {
        //
        let files = document.getElementById("fileElement").files;
        if (files.length !== 1) {
            alert("파일을 선택해 주세요");
            return;
        }
        let formData = new FormData(),
            file = files[0];
        if (file.size > 1024*1024*100) {
            alert("100메가 이하의 파일만 업로드 가능합니다");
            return;
        }
        if (file.name.endsWith(".jar") !== true) {
            alert("jar 파일만 업로드 가능합니다");
            return;
        }
        formData.append('file', file);

        jQuery.ajax({
            url: 'http://ci.jistim.com:11511/api/files', // FIXME: Web-Server File Limit..
            data: formData,
            processData: false,
            contentType: false,
            type: 'POST',
            success: () => {
                alert("업로드 되었습니다.");
                this.setInitialState();
            }
        });
    }
    removeFile(fileName) {
        //
        if (confirm("삭제하시겠습니까?") !== true) {
            return;
        }
        HowsAPI.removeFile(fileName)
            .then(() => {
                alert("삭제되었습니다.");
                this.setInitialState();
            });
    }
    deployFile(fileName) {
        //
        HowsAPI.deployFile(fileName)
            .then(() => {
                alert("배포되었습니다.");
            });
    }
    render() {
        //
        let fileList = this.state.fileList;

        if (fileList === null) {
            return (null);
        } else {
            return (
                <div className="container">
                    <table className="table table-bordered">
                        <thead>
                            <tr>
                                <th>NO</th>
                                <td>파일명</td>
                                <td>파일사이즈</td>
                                <td>배포</td>
                                <td>삭제</td>
                            </tr>
                        </thead>
                        <tbody>
                        {
                            fileList.length === 0 ?
                                <tr>
                                    <td colSpan="5">파일이 없습니다</td>
                                </tr>
                                :
                                fileList.map((file, index) => {
                                    return (
                                        <tr key={file.fileName}>
                                            <th>{index+1}</th>
                                            <td>{file.fileName}</td>
                                            <td>{file.fileSize}</td>
                                            <td>
                                                <button type="button"
                                                        className="btn btn-default"
                                                        onClick={() => this.deployFile(file.fileName)}>
                                                    배포
                                                </button>
                                            </td>
                                            <td>
                                                <button type="button"
                                                        className="btn btn-default"
                                                        onClick={() => this.removeFile(file.fileName)}>
                                                    삭제
                                                </button>
                                            </td>
                                        </tr>
                                    );
                                })
                        }
                        </tbody>
                    </table>
                    <form className="form-inline">
                        <div className="form-group">
                            <input style={{}}
                                   type="file" className="form-control" id="fileElement"/>
                        </div>
                        <button type="button"
                                className="btn btn-default"
                                onClick={this.uploadFile.bind(this)}>
                            파일추가
                        </button>
                    </form>
                </div>
            );
        }
    }
}

export default FileList