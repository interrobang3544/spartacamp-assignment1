# spartacamp-week1-assignment

1. 수정, 삭제 API에서 Resource를 구분하기 위해서 Request를 어떤 방식으로 사용하셨나요? (`param`, `query`, `body`)
const { _postId } = req.params;와 같이 url의 parameter에서 _postId를 받아왔습니다. 
const { user, password, title, content } = req.body;와 같이 body에서 내용을 받아왔습니다.

2. HTTP Method의 대표적인 4가지는 `GET`, `POST`, `PUT`, `DELETE` 가있는데 각각 어떤 상황에서 사용하셨나요?
GET: 게시글 조회, 게시글 상세 조회, 댓글 목록 조회
POST: 게시글 작성, 댓글 생성
PUT: 게시글 수정, 댓글 수정
DELETE: 게시글 삭제, 댓글 삭제

3. RESTful한 API를 설계했나요? 어떤 부분이 그런가요? 어떤 부분이 그렇지 않나요?
URL이나 사용한 HTTP Method들이 쉽게 이해할 수 있도록 잘 설계한 것 같습니다.
다만 _posdtId나 _commentId 값이 mongodb에서 생성한 값을 그대로 이용하여 당장의 기능만으로는 사용하기 편리하지 않은 것 같습니다.

4. 역할별로 Directory Structure를 분리하였을 경우 어떠한 이점이 있을까요?
기능을 추가하거나 유지보수할 때 원활한 작업이 가능해집니다.
