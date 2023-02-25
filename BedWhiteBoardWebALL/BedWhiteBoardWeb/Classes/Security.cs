
#define _TEST_

using System;
using System.Collections.Generic;
using System.IO;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Security.Cryptography;
using System.Security.Cryptography.X509Certificates;
using System.Security.Principal;
using System.Text;
using System.Threading;
using System.Threading.Tasks;
using System.Web;
using System.Web.Http;
//using EBL.Models;
using System.Web.Http.Filters;




namespace BedManagement.Security
{
    //public class Security
    //{
    //}

    public class Crypto
    {
        private static byte[] _salt = Encoding.ASCII.GetBytes("o6806642kbM7c5");

        /// <summary>
        /// Encrypt the given string using AES.  The string can be decrypted using 
        /// DecryptStringAES().  The sharedSecret parameters must match.
        /// </summary>
        /// <param name="plainText">The text to encrypt.</param>
        /// <param name="sharedSecret">A password used to generate a key for encryption.</param>
        public static string EncryptStringAES(string plainText, string sharedSecret)
        {
            if (string.IsNullOrEmpty(plainText))
                throw new ArgumentNullException("plainText");
            if (string.IsNullOrEmpty(sharedSecret))
                throw new ArgumentNullException("sharedSecret");

            string outStr = null;                       // Encrypted string to return
            RijndaelManaged aesAlg = null;              // RijndaelManaged object used to encrypt the data.

            try
            {
                // generate the key from the shared secret and the salt
                Rfc2898DeriveBytes key = new Rfc2898DeriveBytes(sharedSecret, _salt);

                // Create a RijndaelManaged object
                aesAlg = new RijndaelManaged();
                aesAlg.Key = key.GetBytes(aesAlg.KeySize / 8);

                // Create a decryptor to perform the stream transform.
                ICryptoTransform encryptor = aesAlg.CreateEncryptor(aesAlg.Key, aesAlg.IV);

                // Create the streams used for encryption.
                using (MemoryStream msEncrypt = new MemoryStream())
                {
                    // prepend the IV
                    msEncrypt.Write(BitConverter.GetBytes(aesAlg.IV.Length), 0, sizeof(int));
                    msEncrypt.Write(aesAlg.IV, 0, aesAlg.IV.Length);
                    using (CryptoStream csEncrypt = new CryptoStream(msEncrypt, encryptor, CryptoStreamMode.Write))
                    {
                        using (StreamWriter swEncrypt = new StreamWriter(csEncrypt))
                        {
                            //Write all data to the stream.
                            swEncrypt.Write(plainText);
                        }
                    }
                    outStr = Convert.ToBase64String(msEncrypt.ToArray());
                }
            }
            finally
            {
                // Clear the RijndaelManaged object.
                if (aesAlg != null)
                    aesAlg.Clear();
            }

            // Return the encrypted bytes from the memory stream.
            return outStr;
        }

        /// <summary>
        /// Decrypt the given string.  Assumes the string was encrypted using 
        /// EncryptStringAES(), using an identical sharedSecret.
        /// </summary>
        /// <param name="cipherText">The text to decrypt.</param>
        /// <param name="sharedSecret">A password used to generate a key for decryption.</param>
        public static string DecryptStringAES(string cipherText, string sharedSecret)
        {
            if (string.IsNullOrEmpty(cipherText))
                throw new ArgumentNullException("cipherText");
            if (string.IsNullOrEmpty(sharedSecret))
                throw new ArgumentNullException("sharedSecret");

            // Declare the RijndaelManaged object
            // used to decrypt the data.
            RijndaelManaged aesAlg = null;

            // Declare the string used to hold
            // the decrypted text.
            string plaintext = null;

            try
            {
                // generate the key from the shared secret and the salt
                Rfc2898DeriveBytes key = new Rfc2898DeriveBytes(sharedSecret, _salt);

                // Create the streams used for decryption.                
                byte[] bytes = Convert.FromBase64String(cipherText);
                using (MemoryStream msDecrypt = new MemoryStream(bytes))
                {
                    // Create a RijndaelManaged object
                    // with the specified key and IV.
                    aesAlg = new RijndaelManaged();
                    aesAlg.Key = key.GetBytes(aesAlg.KeySize / 8);
                    // Get the initialization vector from the encrypted stream
                    aesAlg.IV = ReadByteArray(msDecrypt);
                    // Create a decrytor to perform the stream transform.
                    ICryptoTransform decryptor = aesAlg.CreateDecryptor(aesAlg.Key, aesAlg.IV);
                    using (CryptoStream csDecrypt = new CryptoStream(msDecrypt, decryptor, CryptoStreamMode.Read))
                    {
                        using (StreamReader srDecrypt = new StreamReader(csDecrypt))

                            // Read the decrypted bytes from the decrypting stream
                            // and place them in a string.
                            plaintext = srDecrypt.ReadToEnd();
                    }
                }
            }
            finally
            {
                // Clear the RijndaelManaged object.
                if (aesAlg != null)
                    aesAlg.Clear();
            }

            return plaintext;
        }

        private static byte[] ReadByteArray(Stream s)
        {
            byte[] rawLength = new byte[sizeof(int)];
            if (s.Read(rawLength, 0, rawLength.Length) != rawLength.Length)
            {
                throw new SystemException("Stream did not contain properly formatted byte array");
            }

            byte[] buffer = new byte[BitConverter.ToInt32(rawLength, 0)];
            if (s.Read(buffer, 0, buffer.Length) != buffer.Length)
            {
                throw new SystemException("Did not read byte array properly");
            }

            return buffer;
        }
    }


    public class CryptographyHelper
    {
        public X509Certificate2 GetX509Certificate(string subjectName)
        {
            X509Store certificateStore = new X509Store(StoreName.My, StoreLocation.LocalMachine);
            certificateStore.Open(OpenFlags.ReadOnly);
            X509Certificate2 certificate;

            try
            {
                certificate = certificateStore.Certificates.OfType<X509Certificate2>().
                                                                FirstOrDefault(cert => cert.SubjectName.Name.Equals(subjectName, StringComparison.OrdinalIgnoreCase));
            }
            finally
            {
                certificateStore.Close();
            }

            if (certificate == null)
                throw new Exception(String.Format("Certificate '{0}' not found.", subjectName));

            return certificate;
        }

        public string Encrypt(X509Certificate2 certificate, string plainToken)
        {
            RSACryptoServiceProvider cryptoProvidor = (RSACryptoServiceProvider)certificate.PublicKey.Key;
            byte[] encryptedTokenBytes = cryptoProvidor.Encrypt(Encoding.UTF8.GetBytes(plainToken), true);
            return Convert.ToBase64String(encryptedTokenBytes);
        }

        public string Decrypt(X509Certificate2 certificate, string encryptedToken)
        {
            RSACryptoServiceProvider cryptoProvidor = (RSACryptoServiceProvider)certificate.PrivateKey;
            byte[] decryptedTokenBytes = cryptoProvidor.Decrypt(Convert.FromBase64String(encryptedToken), true);

            return Encoding.UTF8.GetString(decryptedTokenBytes);
        }
    }




    class Base36
    {
        #region public methods
        public static string ByteArrayToBase36String(byte[] bytes)
        {
            string result = string.Empty;
            result = Encode36((ulong)bytes.Length).PadLeft(BASE36_LENGTH_BLOC_SIZE_36, '0');

            if (bytes.Length > 0)
            {
                List<byte[]> byteslist = SplitBytes(bytes, 8);
                if (byteslist[byteslist.Count - 1].Length < 8)
                {
                    byte[] newLastArray = new byte[8];
                    byteslist[byteslist.Count - 1].CopyTo(newLastArray, 0);
                    byteslist[byteslist.Count - 1] = newLastArray;
                }
                foreach (byte[] byteArray in byteslist)
                {
                    ulong value = 0;

                    //for (int i = 0; i < byteArray.Length; i++) value = value * 256 + byteArray[i];
                    value = BitConverter.ToUInt64(byteArray, 0);
                    result = result + Encode36(value).PadLeft(BASE36_BLOC_SIZE_36, '0');
                }
            }
            return result;
        }
        public static byte[] Base36StringToByteArray(string input)
        {
            byte[] result = new byte[0];
            if (input.Length >= BASE36_LENGTH_BLOC_SIZE_36)
            {
                int arrayLength = (int)Decode36(input.Substring(0, BASE36_LENGTH_BLOC_SIZE_36));
                string data = input.Remove(0, BASE36_LENGTH_BLOC_SIZE_36);
                List<byte[]> bytesList = new List<byte[]>();
                foreach (string value36 in new List<string>(SplitStringByLength(data, BASE36_BLOC_SIZE_36)))
                {
                    byte[] byteArray = BitConverter.GetBytes(Decode36(value36));
                    bytesList.Add(byteArray);
                }
                result = JoinBytes(bytesList);
                Array.Resize(ref result, arrayLength);
            }
            return result;
        }
        #endregion

        #region Const
        private const int BASE36_LENGTH_BLOC_SIZE_36 = 6;
        private const int BASE36_BLOC_SIZE_36 = 13; //Encode36(ulong.MaxValue).Length;
        #endregion

        #region private methods
        static string _CharList36 = string.Empty;
        static private string CharList36
        {
            get
            {
                if (_CharList36.Length < 36)
                {
                    char[] array = new char[36];
                    for (int i = 0; i < 10; i++) array[i] = (char)(i + 48);
                    for (int i = 0; i < 26; i++) array[i + 10] = (char)(i + 97);
                    _CharList36 = new string(array);
                }
                return _CharList36;
            }
        }

        private static List<string> SplitStringByLength(string str, int chunkSize)
        {
            List<string> list = new List<string>();
            int i;
            for (i = 0; i < str.Length / chunkSize; i++)
            {
                list.Add(str.Substring(i * chunkSize, chunkSize));
            }
            i = i * chunkSize;
            if (i < str.Length - 1)
                list.Add(str.Substring(i, str.Length - i));
            return list;
        }

        private static String Encode36(ulong input)
        {
            if (input < 0) throw new ArgumentOutOfRangeException("input", input, "input cannot be negative");

            char[] clistarr = CharList36.ToCharArray();
            var result = new Stack<char>();
            while (input != 0)
            {
                result.Push(clistarr[input % 36]);
                input /= 36;
            }
            return new string(result.ToArray()).ToUpper();
        }

        private static ulong Decode36(string input)
        {
            var reversed = ReverseString(input.ToLower());
            ulong result = 0;
            int pos = 0;
            foreach (char c in reversed)
            {
                result += (ulong)CharList36.IndexOf(c) * (ulong)Math.Pow(36, pos);
                pos++;
            }
            return result;
        }

        private static string ReverseString(string text)
        {
            char[] cArray = text.ToCharArray();
            string reverse = String.Empty;
            for (int i = 0; i < cArray.Length / 2; i++)
            {
                char c = cArray[i];
                cArray[i] = cArray[cArray.Length - 1 - i];
                cArray[cArray.Length - 1 - i] = c;
            }
            return new string(cArray);
        }

        private static byte[] StringToBytes(string str)
        {
            byte[] bytes = new byte[str.Length * sizeof(char)];
            System.Buffer.BlockCopy(str.ToCharArray(), 0, bytes, 0, bytes.Length);
            return bytes;
        }

        private static List<byte[]> SplitBytes(byte[] bytes, int length)
        {
            List<byte[]> result = new List<byte[]>();

            int position = 0;
            while (bytes.Length - position > length)
            {
                byte[] temp = new byte[length];
                for (int i = 0; i < temp.Length; i++) temp[i] = bytes[i + position];
                position += length;
                result.Add(temp);
            }
            if (position < bytes.Length)
            {
                byte[] temp = new byte[bytes.Length - position];
                for (int i = 0; i + position < bytes.Length; i++) temp[i] = bytes[i + position];
                result.Add(temp);
            }
            return result;
        }

        private static string BytesToString(byte[] bytes)
        {
            char[] chars = new char[bytes.Length / sizeof(char)];
            System.Buffer.BlockCopy(bytes, 0, chars, 0, bytes.Length);
            return new string(chars);
        }

        private static byte[] JoinBytes(List<byte[]> listBytes)
        {
            int totalLength = 0;
            foreach (byte[] bytes in listBytes) totalLength += bytes.Length;
            byte[] result = new byte[totalLength];
            int position = 0;
            foreach (byte[] bytes in listBytes)
                for (int i = 0; i < bytes.Length; i++)
                {
                    result[position] = bytes[i];
                    position++;
                }
            return result;
        }

        #endregion
    }

    public class CryptoSystem
    {
        public static string plainText;
        // public string passPhrase = "Pas5pr@se";
        public static string saltValue = "s@1tValue";
        public static string hashAlgorithm = "MD5";
        public static int passwordIterations = 2;
        public static string initVector = "@1B2c3D4e5F6g7H8";
        public static int keySize = 256;

        public static string Encrypt<T>(string value, string password, string salt)
            where T : SymmetricAlgorithm, new()
        {
            DeriveBytes rgb = new Rfc2898DeriveBytes(password, Encoding.Unicode.GetBytes(salt));

            SymmetricAlgorithm algorithm = new T();

            byte[] rgbKey = rgb.GetBytes(algorithm.KeySize >> 3);
            byte[] rgbIV = rgb.GetBytes(algorithm.BlockSize >> 3);

            ICryptoTransform transform = algorithm.CreateEncryptor(rgbKey, rgbIV);

            using (MemoryStream buffer = new MemoryStream())
            {
                using (CryptoStream stream = new CryptoStream(buffer, transform, CryptoStreamMode.Write))
                {
                    using (StreamWriter writer = new StreamWriter(stream, Encoding.Unicode))
                    {
                        writer.Write(value);
                    }
                }

                return Convert.ToBase64String(buffer.ToArray());
            }
        }

        public static string Decrypt<T>(string text, string password, string salt)
           where T : SymmetricAlgorithm, new()
        {
            DeriveBytes rgb = new Rfc2898DeriveBytes(password, Encoding.Unicode.GetBytes(salt));

            SymmetricAlgorithm algorithm = new T();

            byte[] rgbKey = rgb.GetBytes(algorithm.KeySize >> 3);
            byte[] rgbIV = rgb.GetBytes(algorithm.BlockSize >> 3);

            ICryptoTransform transform = algorithm.CreateDecryptor(rgbKey, rgbIV);

            using (MemoryStream buffer = new MemoryStream(Convert.FromBase64String(text)))
            {
                using (CryptoStream stream = new CryptoStream(buffer, transform, CryptoStreamMode.Read))
                {
                    using (StreamReader reader = new StreamReader(stream, Encoding.Unicode))
                    {
                        return reader.ReadToEnd();
                    }
                }
            }
        }

        public static string Encrypt(string plainText, string passPhrase)
        {
            byte[] initVectorBytes = Encoding.ASCII.GetBytes(initVector);
            byte[] saltValueBytes = Encoding.ASCII.GetBytes(saltValue);
            byte[] plainTextBytes = Encoding.UTF8.GetBytes(plainText);
            PasswordDeriveBytes password = new PasswordDeriveBytes(passPhrase, saltValueBytes, hashAlgorithm, passwordIterations);
            byte[] keyBytes = password.GetBytes(keySize / 8);
            RijndaelManaged symmetricKey = new RijndaelManaged();
            symmetricKey.Mode = CipherMode.CBC;
            ICryptoTransform encryptor = symmetricKey.CreateEncryptor(keyBytes, initVectorBytes);
            MemoryStream memoryStream = new MemoryStream();
            CryptoStream cryptoStream = new CryptoStream(memoryStream, encryptor, CryptoStreamMode.Write);
            cryptoStream.Write(plainTextBytes, 0, plainTextBytes.Length);
            cryptoStream.FlushFinalBlock();
            byte[] cipherTextBytes = memoryStream.ToArray();
            memoryStream.Close();
            cryptoStream.Close();
            //string cipherText = Convert.ToBase64String(cipherTextBytes);
            string cipherText = Base36.ByteArrayToBase36String(cipherTextBytes);
            return cipherText;
        }

        public static string Decrypt(string cipherText, string passPhrase)
        {
            byte[] initVectorBytes = Encoding.ASCII.GetBytes(initVector);
            byte[] saltValueBytes = Encoding.ASCII.GetBytes(saltValue);
            //byte[] cipherTextBytes = Convert.FromBase64String(cipherText);
            byte[] cipherTextBytes = Base36.Base36StringToByteArray(cipherText);
            PasswordDeriveBytes password = new PasswordDeriveBytes(passPhrase, saltValueBytes, hashAlgorithm, passwordIterations);
            byte[] keyBytes = password.GetBytes(keySize / 8);
            RijndaelManaged symmetricKey = new RijndaelManaged();
            symmetricKey.Mode = CipherMode.CBC;
            ICryptoTransform decryptor = symmetricKey.CreateDecryptor(keyBytes, initVectorBytes);
            MemoryStream memoryStream = new MemoryStream(cipherTextBytes);
            CryptoStream cryptoStream = new CryptoStream(memoryStream, decryptor, CryptoStreamMode.Read);
            byte[] plainTextBytes = new byte[cipherTextBytes.Length];
            int decryptedByteCount = cryptoStream.Read(plainTextBytes, 0, plainTextBytes.Length);
            memoryStream.Close();
            cryptoStream.Close();
            string plainText = Encoding.UTF8.GetString(plainTextBytes, 0, decryptedByteCount);
            return plainText;
        }
    }


    public static class Extensions
    {
        public static string GetClientIP(this HttpRequestMessage request)
        {
            return ((HttpContextWrapper)request.Properties["MS_HttpContext"]).Request.UserHostAddress;
        }

        public static Dictionary<string, string> ToDictionary(this string keyValue)
        {
            return keyValue.Split(new[] { ';' }, StringSplitOptions.RemoveEmptyEntries)
                          .Select(part => part.Split('='))
                          .ToDictionary(split => split[0], split => split[1]);
        }

    }

    public class FilterConfig
    {
        public static void RegisterGlobalFilters(System.Web.Http.Filters.HttpFilterCollection filters)
        {

            // filters.Add(new HandleErrorAttribute());
        }
    }

    public class HTTPSGuard : DelegatingHandler
    {
        protected override Task<HttpResponseMessage> SendAsync(HttpRequestMessage request, CancellationToken cancellationToken)
        {

            return base.SendAsync(request, cancellationToken);
        }
    }



    public class IdentityStore
    {
        //private static Dictionary<string, string> users = new Dictionary<string, string> { { "Alex", "@lex" }, { "Cruz", "cruz007" }, { "Amr", "pass" } };


        public static bool IsValidUser(MyUser user)
        {
            //ECDBEntities db = new ECDBEntities();
            //var uid = long.Parse(user.UserId.Split(',')[1]);
            //var us = db.Users.Where(x => x.UserId == uid).FirstOrDefault();
            //if (us == null)
            //    return false;

            return true;
        }

        public static bool IsValidUserId(string userId)
        {
            //ECDBEntities db = new ECDBEntities();
            //var uid = long.Parse(userId.Split(',')[1]);
            //var us = db.Users.Where(x => x.UserId == uid).FirstOrDefault();
            //if (us == null)
            //    return false;

            return true;
        }

    }

    public class RouteConfig
    {
        public static void RegisterRoutes(HttpConfiguration routes)
        {
            //routes.Routes.IgnoreRoute("{resource}.axd/{*pathInfo}");
            routes.Routes.MapHttpRoute(
                                        name: "Default",
                                        routeTemplate: "{controller}/{action}/{id}",
                                        defaults: new { action = RouteParameter.Optional, id = RouteParameter.Optional }
                                        );
            routes.Routes.MapHttpRoute(
                                        name: "Security",
                                        routeTemplate: "api/{controller}/{id}",
                                        defaults: new { id = RouteParameter.Optional }
                                        );

        }
    }


    public class Status
    {
        public bool Successeded { get; set; }
        public string Token { get; set; }
        public string Message { get; set; }
    }


    public class Token
    {
        public Token(string userId, string role, string fromIP)
        {
            UserId = userId;
            IP = fromIP;
            Role = role;
        }

        public string UserId { get; private set; }
        public string Role { get; private set; }
        public string IP { get; private set; }

        public string Encrypt()
        {

#if _TEST_
            return Crypto.EncryptStringAES(this.ToString(), "TOKEN");
#else 
            CryptographyHelper cryptographyHelper = new CryptographyHelper();
            X509Certificate2 certificate = cryptographyHelper.GetX509Certificate("CN=WebAPI-Token");
            return cryptographyHelper.Encrypt(certificate, this.ToString());
#endif
        }

        public override string ToString()
        {
            return String.Format("UserId={0};Role={1};IP={2}", UserId, Role, IP);
        }

        public static Token Decrypt(string encryptedToken)
        {
#if _TEST_
            string decrypted = Crypto.DecryptStringAES(encryptedToken, "TOKEN");
#else
            CryptographyHelper cryptographyHelper = new CryptographyHelper();
            X509Certificate2 certificate = cryptographyHelper.GetX509Certificate("CN=WebAPI-Token");
            string decrypted = cryptographyHelper.Decrypt(certificate, encryptedToken);
#endif

            //Splitting it to dictionary
            Dictionary<string, string> dictionary = decrypted.ToDictionary();
            return new Token(dictionary["UserId"], dictionary["Role"], dictionary["IP"]);
        }
    }



    public class TokenInspector : DelegatingHandler
    {
        protected override Task<HttpResponseMessage> SendAsync(HttpRequestMessage request, CancellationToken cancellationToken)
        {
            const string TOKEN_NAME = "X-Token";

            if (request.Headers.Contains(TOKEN_NAME))
            {
                string encryptedToken = request.Headers.GetValues(TOKEN_NAME).First();
                try
                {
                    Token token = Token.Decrypt(encryptedToken);
                    bool isValidUserId = IdentityStore.IsValidUserId(token.UserId);
                    bool requestIPMatchesTokenIP = token.IP.Equals(request.GetClientIP());

                    if (!isValidUserId || !requestIPMatchesTokenIP)
                    {
                        HttpResponseMessage reply = request.CreateErrorResponse(HttpStatusCode.Unauthorized, "Invalid indentity or client machine.");
                        return Task.FromResult(reply);
                    }
                    Thread.CurrentPrincipal = new GenericPrincipal(new GenericIdentity(token.UserId, token.Role), new[] { "Administrator", "ViewOnly", "ViewEdit" });
                    HttpContext.Current.User = Thread.CurrentPrincipal;
                }
                catch (Exception ex)
                {
                    HttpResponseMessage reply = request.CreateErrorResponse(HttpStatusCode.Unauthorized, "Invalid token.");
                    return Task.FromResult(reply);
                }
            }
            else
            {
                // HttpResponseMessage reply = request.CreateErrorResponse(HttpStatusCode.Unauthorized, "Request is missing authorization token.");
                //return Task.FromResult(reply);
            }

            return base.SendAsync(request, cancellationToken);
        }

    }

    public class HandleExceptionAttribute : ExceptionFilterAttribute
    {

        public Type Type { get; set; }
        public HttpStatusCode Status { get; set; }

        public override void OnException(HttpActionExecutedContext context)
        {
            var ex = context.Exception;
            if (ex.GetType() is Type)
            {
                var response = context.Request.CreateResponse<string>(Status, ex.Message);
                throw new HttpResponseException(response);
            }
        }
    }

    public class MyUser
    {
        /// <summary>
        /// Initializes a new instance of the User class.
        /// </summary>
        public MyUser(string userId, string password, string role = "user")
        {
            UserId = userId;
            Password = password;
            Role = role;
        }

        public string UserId { get; set; }
        public string Password { get; set; }
        public string Role { get; set; }
    }
}