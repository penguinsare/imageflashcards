using ImageFlashCards.Models;
using Microsoft.AspNetCore.Http;
using Microsoft.Extensions.Configuration;
using System;
using System.Collections.Generic;
using System.IO;
using System.Linq;
using System.Threading.Tasks;

namespace ImageFlashCards.Services
{
    public class SavedImageHandler: ISavedImageHandler
    {
        private string _connectionString;
        private string _containerReference = "documents";
        private IConfiguration _configuration;
        public SavedImageHandler(IConfiguration configuration)
        {
            _configuration = configuration;
            //_connectionString = _configuration["Azure:StorageConnectionString"];
        }

        //public async Task<SavedImage> RetrieveSavedDocument(string fileName)
        //{
        //    return null;
        //    //var container = await ConnectToAzureCloudStorageContainer();
        //    //if (fileName == null)
        //    //    throw new ArgumentNullException("fileName");
        //    //var memStream = new MemoryStream();
        //    //var blockBlob = container.GetBlockBlobReference(fileName);
        //    //if (blockBlob.Exists())
        //    //{
        //    //    blockBlob.DownloadToStream(memStream);
        //    //}

        //    //memStream.Position = 0;
        //    //var returnDocument = new SavedDocument(
        //    //    memStream.GetBuffer(),
        //    //    "application/pdf",
        //    //    fileName);
        //    //return returnDocument;

        //}

        public async Task<LessonImage> SaveImage(IFormFile imageFormFile)
        {            
            var filePath = Path.Combine(_configuration["ImageFolder:BasePhysicalPath"],
                Path.GetFileName(imageFormFile.FileName));
           
            try
            {
                using (var stream = new FileStream(filePath, FileMode.CreateNew, FileAccess.Write, FileShare.Read))
                {
                    await imageFormFile.CopyToAsync(stream);
                    return new LessonImage()
                    {
                        FileName = Path.GetFileNameWithoutExtension(imageFormFile.FileName),
                        FileNameAndExtension = Path.GetFileName(imageFormFile.FileName),
                        ImagePhysicalPath = filePath,
                        ImageUrlPath = Path.Combine(_configuration["ImageFolder:BaseUrlPath"]) + Path.GetFileName(imageFormFile.FileName)
                    };
                }
            }
            catch (Exception ex)
            {
                // if file already exists
                try
                {
                    var newFileName =
                    "\\" +
                    Path.GetFileNameWithoutExtension(filePath) +
                    "_" +
                    DateTime.Now.ToString("yyyyMMddHHmmss") +
                    Path.GetExtension(filePath);
                    var newFilePath = Path.Combine(
                        Path.GetDirectoryName(filePath) +
                        newFileName);
                    using (var stream = new FileStream(newFilePath, FileMode.CreateNew))
                    {
                        await imageFormFile.CopyToAsync(stream);
                    }

                    return new LessonImage()
                    {
                        FileName = Path.GetFileNameWithoutExtension(newFilePath),
                        FileNameAndExtension = Path.GetFileName(newFilePath),
                        ImagePhysicalPath = newFilePath,
                        ImageUrlPath = Path.Combine(_configuration["ImageFolder:BaseUrlPath"]) + Path.GetFileName(newFilePath)
                    };
                }
                catch (Exception ex2)
                {
                    throw;
                }

            }
        }

        //public async void DeleteDocument(string pathToFile)
        //{
        //    //try
        //    //{
        //    //    var container = await ConnectToAzureCloudStorageContainer();
        //    //    container.GetBlockBlobReference(fileName).DeleteIfExists();
        //    //}
        //    //catch (Exception ex)
        //    //{
        //    //    var debugEx = ex;
        //    //}
        //}

        //private async Task<CloudBlobContainer> ConnectToAzureCloudStorageContainer()
        //{
        //    CloudStorageAccount cloudStorageAccount = CloudStorageAccount.Parse(_connectionString);
        //    //create a block blob CloudBlobClient cloudBlobClient = cloudStorageAccount.CreateCloudBlobClient();
        //    CloudBlobClient cloudBlobClient = cloudStorageAccount.CreateCloudBlobClient();
        //    //create a container CloudBlobContainer cloudBlobContainer = cloudBlobClient.GetContainerReference("appcontainer");
        //    CloudBlobContainer cloudBlobContainer = cloudBlobClient.GetContainerReference(_containerReference);

        //    if (await cloudBlobContainer.CreateIfNotExistsAsync())
        //    {
        //        await cloudBlobContainer.SetPermissionsAsync(new BlobContainerPermissions { PublicAccess = BlobContainerPublicAccessType.Blob });
        //    }

        //    return cloudBlobContainer;
        //}
    }
}
