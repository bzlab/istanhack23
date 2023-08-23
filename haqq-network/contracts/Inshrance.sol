pragma solidity ^0.8.0;

//THİS CODE CAN BE UNDERSTOOD ONLY BY ME OR TENGRİ SO DONT TRY TO READ COMMENTS
//FUTUREWORK sigorta dolduktan sonra assetlerden silinmiyor ama aynı idde de yeni asset ekleyemiyosun baştan sigortalatma için ne yapmak lazım

contract Inshrance {
    event NewApply(string characterization, uint assetHash);
    event Approved(string characterization, uint assetHash);
    event NotApproved(string characterization, uint assetHash);

    address public owner;
    uint public poolBalance; //böylece sigorta şirketine para yatırmayı düşünen kişiler pool balance bakıp karar verebilir
    uint public totalContributions; //böylece bu şirkete ne kadar güvenilmiş ne kadar para yatırılmış görücez
    uint public durationOfInsurance = 365 days; //FUTUREWORK 6 ya da 3 aylık paketler de ekle
    uint public rateOfInsurance1 = 2;
    uint public rateOfInsurance2 = 10;

    struct Asset {
        bool isApproved; //contract sahibi bu ürünü onayladı mı ve default false geliyo
        string characterization; //kişi bu ürünü nasıl tanımlıyo kendince mesela 'benim güzel arabammmm'
        uint assetId; //oracledan gelen noterID
        uint value; //oracledan alıcaz ürünün değeri ne kadar
        address ownerOfAsset; //asset sahibinin adresi
        uint annulmentTime; //bizim 12 aylık sürecimiz ne zaman dolucak
        uint assetHash; //bütünlük bozulmasın diye koyduğumuz yukardaki değerlerin hashi
        bool isClaimed; //sigorta değeri alınmış mı  
    }

    Asset[] public assets; //tüm assetlerin bulunduğu array  
    Asset[] public assetsOnValidation;
    Asset[] public assetsOfDisadvantageds;

    mapping(uint => address) public assetToOwner; //assetin sahibinin adresini veren mapping Assete ekledik bunu zaten aslında gerek kalmadı ya mappingi sil ya da assetteki addressi
    mapping(uint => Asset) public idToAsset; //from id mapp us asset
    mapping(address => Asset[]) public assetsOfOwner; //FUTURE WORK for loopu olmadan mümkün mü, ownerın sahip olduğu assetleri bize döndüren array döndürebiliyor mu sor 

    modifier onlyAssetOwner(uint _assetId) { 
        require(msg.sender == assetToOwner[_assetId], "Only the asset owner can perform this action."); 
        _;
    }

    modifier onlyOwner() {
        require(msg.sender == owner, "Only the contract owner can perform this action.");
        _;
    }

    constructor() {
        owner = msg.sender;
    }

    function applyInsurance(string memory _characterization, uint _assetId, uint _value) external payable { //burda başvurucaz insurance için payofu kabul edilene ya da edilmeyene kadar paramız onlarda
        require(msg.value == _value * rateOfInsurance1 / rateOfInsurance2);
        require(true); //DAHA ÖNCE SİGORTALATILMIŞ MI, BU ASSETIDYE SAHİP OLAN KİŞİ YANİ NOTERIDYİ VEREN KİŞİ GERÇEKTEN BU ÜRÜNÜN SAHİBİ Mİ WİTH ORACLE
        uint _assetHash = uint(keccak256(abi.encodePacked(_assetId, _value, msg.sender, (durationOfInsurance + block.timestamp)))); 
        assetsOnValidation.push(Asset(false, _characterization, _assetId, _value, msg.sender, (durationOfInsurance + block.timestamp), _assetHash, false));
        emit NewApply(_characterization, _assetHash);
    }

    function applyInsuranceOfDisadvantageds(string memory _characterization, uint _assetId, uint _value) internal { //FAKİR ALIN EVİNİZİ ŞIMARTIN
        require(true); //DAHA ÖNCE SİGORTALATILMIŞ MI, BU ASSETIDYE SAHİP OLAN KİŞİ YANİ NOTERIDYİ VEREN KİŞİ GERÇEKTEN BU ÜRÜNÜN SAHİBİ Mİ WİTH ORACLE
        uint _assetHash = uint(keccak256(abi.encodePacked(_assetId, _value, msg.sender, (durationOfInsurance + block.timestamp)))); 
        assetsOnValidation.push(Asset(false, _characterization, _assetId, _value, msg.sender, (durationOfInsurance + block.timestamp), _assetHash, false));
        emit NewApply(_characterization, _assetHash);
    }
   
    function insureAsset() external payable onlyOwner{
        if (true) { //EĞER ORACLEDAN ÇEKTIĞIMIZ VALUE, ID VE BENZERI ŞEYLER TUTUYORSA
            Asset memory _newAsset = assetsOnValidation[assetsOnValidation.length - 1];
            emit Approved(_newAsset.characterization, _newAsset.assetHash);
            _newAsset.isApproved = true;
            assets.push(_newAsset);
            idToAsset[_newAsset.assetId] = assets[assets.length - 1];
            assetToOwner[_newAsset.assetId] = _newAsset.ownerOfAsset;
            totalContributions += _newAsset.value * rateOfInsurance1 / rateOfInsurance2;
            poolBalance += _newAsset.value * rateOfInsurance1 / rateOfInsurance2;
            assetsOnValidation.pop();
        } else {
            Asset memory _newAsset = assetsOnValidation[assetsOnValidation.length - 1];
            emit NotApproved(_newAsset.characterization, _newAsset.assetHash);
            payable(_newAsset.ownerOfAsset).transfer(_newAsset.value * rateOfInsurance1 / rateOfInsurance2);
            assetsOnValidation.pop();
        }
    }

    function claimInsurance(uint _assetId) external payable onlyAssetOwner(_assetId) {
        Asset storage _newAsset = idToAsset[_assetId];
        require(_newAsset.isClaimed == false);
        require(_newAsset.annulmentTime >= block.timestamp); //süresi doldu mu bak
        require(true); //oracledan kaza olup olmadığını kontrol et
        poolBalance -= _newAsset.value * rateOfInsurance1 / rateOfInsurance2;
        _newAsset.isClaimed = true;
        payable(msg.sender).transfer(_newAsset.value);
    }

    function withdraw(uint _amount) external payable onlyOwner {
        payable(owner).transfer(_amount);
    }

    function getInfo(uint _assetId) public view returns(Asset memory) { 
        Asset memory _newAsset = idToAsset[_assetId];
        return _newAsset;
    }

    function prolongInsurance(uint _assetId) external payable onlyAssetOwner(_assetId) {
        Asset storage _newAsset = idToAsset[_assetId];
        require(_newAsset.annulmentTime <= block.timestamp);
        require((_newAsset.value * rateOfInsurance1 / rateOfInsurance2) == msg.value);
        _newAsset.annulmentTime = block.timestamp + durationOfInsurance;
    }

    function applyOfDisadvantagedIndividuals(string memory _characterization, uint _assetId, uint _value) external {
        require(true); //credentiallar onaylanmış kabul edildi KESİN FAKİR İSE
        applyInsuranceOfDisadvantageds(_characterization, _assetId, _value);
    } 
}